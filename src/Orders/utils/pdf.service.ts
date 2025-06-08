import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { IOrder } from './order.interface';

@Injectable()
export class PdfService {
  private buildHtml(order: IOrder): string {
    return `
  <html>
  <head>
    <meta charset="UTF-8" />
    <style>
      :root {
        --primary: #1a237e;
        --secondary: #1565c0;
        --text: #2c3e50;
        --bg-section: #ffffff;
        --border-radius: 6px;
      }

      body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        margin: 40px;
        color: var(--text);
        background-color: #fff;
      }

      .header {
        display: flex;
        justify-content: space-between;
        border-bottom: 2px solid var(--secondary);
        padding-bottom: 12px;
        margin-bottom: 24px;
      }

      .header h1 {
        font-size: 22px;
        color: var(--primary);
        margin: 0;
      }

      .header p {
        margin: 4px 0 0;
        font-size: 13px;
      }

      .badge {
        display: inline-block;
        padding: 2px 6px;
        font-size: 12px;
        font-weight: bold;
        border-radius: 10px;
        background: var(--secondary);
        color: #fff;
      }

      .section {
        margin-bottom: 20px;
        padding: 16px;
        background: var(--bg-section);
        border-radius: var(--border-radius);
        border: 1px solid #e0e0e0;
      }

      .section h2 {
        font-size: 16px;
        color: var(--secondary);
        margin: 0 0 8px;
      }

      .info-row {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }

      .info-item {
        flex: 1;
        min-width: 180px;
        margin-bottom: 8px;
      }

      .label {
        font-weight: bold;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 8px;
      }

      th,
      td {
        text-align: left;
        padding: 6px 8px;
        border-bottom: 1px solid #e0e0e0;
        font-size: 13px;
      }

      th {
        background: #f5f7fa;
        font-weight: bold;
      }

      .footer {
        margin-top: 40px;
        display: flex;
        justify-content: space-between;
      }

      .signature {
        width: 45%;
        border-top: 1px solid var(--text);
        text-align: center;
        padding-top: 6px;
        font-size: 13px;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <div>
        <h1>Empresa X</h1>
        <p>CNPJ: 00.000.000/0000-00</p>
      </div>
      <div style="text-align: right">
        <h1>Pedido Nº <span>${order.id}</span></h1>
        <p>Status: <span class="badge">${order.status}</span></p>
      </div>
    </div>

    <div class="section">
      <h2>Cliente</h2>
      <div class="info-row">
        <div class="info-item">
          <p><span class="label">Nome:</span> ${order.customer.name}</p>
          <p><span class="label">CPF/CNPJ:</span> ${order.customer.cpfCnpj}</p>
          <p><span class="label">Email:</span> ${order.customer.email}</p>
          <p><span class="label">Telefone:</span> ${order.customer.phone}</p>
        </div>
        <div class="info-item">
          <p><span class="label">Endereço:</span> 
            ${order.customer.address.street}, ${order.customer.address.number}
            ${order.customer.address.complement ? ` - ${order.customer.address.complement}` : ''}
            - ${order.customer.address.neighborhood}, ${order.customer.address.city} - ${order.customer.address.uf}
            CEP: ${order.customer.address.cep}
          </p>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Origem & Destino</h2>
      <div class="info-row">
        <div class="info-item">
          <p><span class="label">Origem:</span> ${order.origin}</p>
        </div>
        <div class="info-item">
          <p><span class="label">Destino:</span> ${order.destination}</p>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Datas</h2>
      <div class="info-row">
        <div class="info-item">
          <p><span class="label">Partida:</span> ${new Date(order.departureDate).toLocaleDateString()}</p>
        </div>
        <div class="info-item">
          <p><span class="label">Chegada:</span> ${new Date(order.arrivalDate).toLocaleDateString()}</p>
        </div>
        <div class="info-item">
          <p><span class="label">Criada em:</span> ${new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Veículo</h2>
      <div class="info-row">
        <div class="info-item">
          <p><span class="label">Placa:</span> ${order.vehicle.vehicle_plate}</p>
          <p><span class="label">Modelo:</span> ${order.vehicle.model}</p>
        </div>
        <div class="info-item">
          <p><span class="label">Marca:</span> ${order.vehicle.brand}</p>
          <p><span class="label">Ano:</span> ${order.vehicle.year}</p>
          <p><span class="label">Chassi:</span> ${order.vehicle.chassi_number}</p>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Motorista</h2>
      <div class="info-row">
        <div class="info-item">
          <p><span class="label">Nome:</span> ${order.driver.name}</p>
          <p><span class="label">CPF:</span> ${order.driver.cpf}</p>
        </div>
        <div class="info-item">
          <p><span class="label">Telefone:</span> ${order.driver.phone}</p>
          <p><span class="label">Email:</span> ${order.driver.email}</p>
        </div>
      </div>
    </div>

    <div class="section">
      <h2>Histórico de Status</h2>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${order.statusHistory
            .map(
              (sh) => `
            <tr>
              <td>${new Date(sh.date).toLocaleDateString()}</td>
              <td>${sh.status}</td>
            </tr>
          `,
            )
            .join('')}
        </tbody>
      </table>
    </div>

    <div class="footer">
      <div class="signature">Assinatura Recebimento</div>
      <div class="signature">Data: ______ / ______ / ______</div>
    </div>
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
