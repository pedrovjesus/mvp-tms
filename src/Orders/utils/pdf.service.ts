import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { IOrder } from './order.interface';

@Injectable()
export class PdfService {
  private buildHtml(order: IOrder): string {
    return `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1, h2 { color: #333; }
          p { margin: 5px 0; }
          ul { padding-left: 20px; }
          li { margin-bottom: 4px; }
        </style>
      </head>
      <body>
        <h1>Order #${order.id}</h1>
        <p><strong>Origin:</strong> ${order.origin}</p>
        <p><strong>Destination:</strong> ${order.destination}</p>
        <p><strong>Departure Date:</strong> ${order.departureDate}</p>
        <p><strong>Arrival Date:</strong> ${order.arrivalDate}</p>
        <p><strong>Status:</strong> ${order.status}</p>
        <p><strong>Created At:</strong> ${order.createdAt}</p>

        <h2>Customer</h2>
        <p>${order.customer.name}</p>

        <h2>Vehicle</h2>
        <p>Plate: ${order.vehicle.plate}</p>

        <h2>Driver</h2>
        <p>${order.driver.name}</p>

        <h2>Status History</h2>
        <ul>
          ${order.statusHistory
            .map((sh) => `<li>${sh.date} - <strong>${sh.status}</strong></li>`)
            .join('')}
        </ul>
      </body>
      </html>
    `;
  }

  async generatePdfFromHtml(order: IOrder): Promise<Buffer> {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const page = await browser.newPage();

      const html = this.buildHtml(order);
      await page.setContent(html, { waitUntil: 'networkidle0' });
      //formato do pdf
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
      });

      await browser.close();
      return Buffer.from(pdfBuffer);
    } catch (error) {
      console.error('Erro em generatePdfFromHtml:', error);
      throw new Error('Erro ao gerar o PDF');
    }
  }
}
