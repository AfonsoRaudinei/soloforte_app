import 'dart:typed_data';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;
import 'package:printing/printing.dart';
import 'package:soloforte_app/features/map/domain/geo_area.dart';
import 'package:intl/intl.dart';

class ReportService {
  Future<void> generateAndShareNDVIReport({
    required GeoArea area,
    required DateTime date,
    required Uint8List? ndviImageBytes,
    required Map<String, dynamic>? stats,
  }) async {
    final doc = pw.Document();

    doc.addPage(
      pw.Page(
        pageFormat: PdfPageFormat.a4,
        build: (pw.Context context) {
          return pw.Column(
            crossAxisAlignment: pw.CrossAxisAlignment.start,
            children: [
              _buildHeader(area, date),
              pw.SizedBox(height: 20),
              _buildMapSection(ndviImageBytes),
              pw.SizedBox(height: 20),
              _buildStatsSection(stats),
              pw.Spacer(),
              _buildFooter(),
            ],
          );
        },
      ),
    );

    await Printing.sharePdf(
      bytes: await doc.save(),
      filename: 'relatorio_ndvi_${area.name}.pdf',
    );
  }

  pw.Widget _buildHeader(GeoArea area, DateTime date) {
    return pw.Column(
      crossAxisAlignment: pw.CrossAxisAlignment.start,
      children: [
        pw.Text(
          'Relatório de Análise NDVI',
          style: pw.TextStyle(fontSize: 24, fontWeight: pw.FontWeight.bold),
        ),
        pw.SizedBox(height: 10),
        pw.Row(
          mainAxisAlignment: pw.MainAxisAlignment.spaceBetween,
          children: [
            pw.Text('Área: ${area.name}'),
            pw.Text('Data da Imagem: ${DateFormat('dd/MM/yyyy').format(date)}'),
          ],
        ),
        pw.Text('Tamanho: ${area.areaHectares.toStringAsFixed(2)} ha'),
        pw.Divider(),
      ],
    );
  }

  pw.Widget _buildMapSection(Uint8List? imageBytes) {
    if (imageBytes == null) {
      return pw.Container(
        height: 300,
        alignment: pw.Alignment.center,
        decoration: pw.BoxDecoration(border: pw.Border.all()),
        child: pw.Text('Imagem NDVI indisponível'),
      );
    }
    return pw.Column(
      crossAxisAlignment: pw.CrossAxisAlignment.start,
      children: [
        pw.Text(
          'Mapa de Vigor Vegetativo',
          style: pw.TextStyle(fontWeight: pw.FontWeight.bold),
        ),
        pw.SizedBox(height: 8),
        pw.Container(
          height: 400,
          width: double.infinity,
          alignment: pw.Alignment.center,
          decoration: pw.BoxDecoration(
            border: pw.Border.all(color: PdfColors.grey300),
          ),
          child: pw.Image(pw.MemoryImage(imageBytes), fit: pw.BoxFit.contain),
        ),
        pw.SizedBox(height: 8),
        _buildLegend(),
      ],
    );
  }

  pw.Widget _buildLegend() {
    return pw.Row(
      mainAxisAlignment: pw.MainAxisAlignment.center,
      children: [
        _legendItem(PdfColors.red, '< 0.2 (Solo/Morto)'),
        pw.SizedBox(width: 10),
        _legendItem(PdfColors.yellow, '0.2-0.4 (Estresse)'),
        pw.SizedBox(width: 10),
        _legendItem(PdfColors.lightGreen, '0.4-0.6 (Moderado)'),
        pw.SizedBox(width: 10),
        _legendItem(PdfColor.fromInt(0xFF2E7D32), '> 0.6 (Vigoroso)'),
      ],
    );
  }

  pw.Widget _legendItem(PdfColor color, String label) {
    return pw.Row(
      children: [
        pw.Container(width: 10, height: 10, color: color),
        pw.SizedBox(width: 4),
        pw.Text(label, style: const pw.TextStyle(fontSize: 10)),
      ],
    );
  }

  pw.Widget _buildStatsSection(Map<String, dynamic>? stats) {
    if (stats == null ||
        stats['data'] == null ||
        (stats['data'] as List).isEmpty) {
      return pw.Text('Estatísticas indisponíveis');
    }

    try {
      final bands = stats['data'][0]['outputs']['ndvi']['bands']['B0'];
      final mean = bands['stats']['mean'];
      final std = bands['stats']['stDev'];
      final min = bands['stats']['min'];
      final max = bands['stats']['max'];

      return pw.Column(
        crossAxisAlignment: pw.CrossAxisAlignment.start,
        children: [
          pw.Text(
            'Estatísticas do Talhão',
            style: pw.TextStyle(fontSize: 16, fontWeight: pw.FontWeight.bold),
          ),
          pw.SizedBox(height: 10),
          pw.Table(
            border: pw.TableBorder.all(color: PdfColors.grey300),
            children: [
              pw.TableRow(
                children: [
                  _tableCell('Média NDVI'),
                  _tableCell(mean?.toStringAsFixed(3) ?? "-"),
                ],
              ),
              pw.TableRow(
                children: [
                  _tableCell('Desvio Padrão'),
                  _tableCell(std?.toStringAsFixed(3) ?? "-"),
                ],
              ),
              pw.TableRow(
                children: [
                  _tableCell('Mínimo'),
                  _tableCell(min?.toStringAsFixed(3) ?? "-"),
                ],
              ),
              pw.TableRow(
                children: [
                  _tableCell('Máximo'),
                  _tableCell(max?.toStringAsFixed(3) ?? "-"),
                ],
              ),
            ],
          ),
        ],
      );
    } catch (e) {
      return pw.Text('Erro ao processar estatísticas');
    }
  }

  pw.Widget _tableCell(String text) {
    return pw.Padding(
      padding: const pw.EdgeInsets.all(5),
      child: pw.Text(text),
    );
  }

  pw.Widget _buildFooter() {
    return pw.Column(
      children: [
        pw.Divider(),
        pw.Center(
          child: pw.Text(
            'Gerado por Solo Forte App - ${DateFormat('dd/MM/yyyy HH:mm').format(DateTime.now())}',
            style: const pw.TextStyle(fontSize: 10, color: PdfColors.grey),
          ),
        ),
      ],
    );
  }
}
