import 'dart:io';
import 'dart:typed_data';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:image_picker/image_picker.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_spacing.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';
import 'package:soloforte_app/features/marketing/presentation/widgets/stamps/location_stamp.dart';
import 'package:soloforte_app/features/marketing/presentation/widgets/stamps/ndvi_chart_stamp.dart';
import 'package:soloforte_app/features/marketing/presentation/widgets/stamps/productivity_stamp.dart';

class ImageEditorScreen extends StatefulWidget {
  final XFile imageFile;

  const ImageEditorScreen({super.key, required this.imageFile});

  @override
  State<ImageEditorScreen> createState() => _ImageEditorScreenState();
}

class _ImageEditorScreenState extends State<ImageEditorScreen> {
  final GlobalKey _globalKey = GlobalKey();
  String _activeTool = 'Filtros';

  // Adjustments
  double _brightness = 0.0;
  double _contrast = 1.0;
  double _saturation = 1.0;

  // Filter
  List<double> _currentFilter = _noFilter;

  // Overlays
  List<EditorLayer> _layers = [];
  bool _showWatermark = false;
  bool _showLogo = false;

  // Crop (Mocked for visual only as complex cropping requires packages/native)
  bool _isCropping = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.white),
        backgroundColor: Colors.black,
        title: const Text('Editar Foto', style: TextStyle(color: Colors.white)),
        actions: [
          IconButton(
            icon: const Icon(Icons.undo),
            onPressed: _layers.isNotEmpty
                ? () {
                    setState(() {
                      _layers.removeLast();
                    });
                  }
                : null,
          ),
          TextButton(
            onPressed: _saveImage,
            child: const Text(
              'Salvar',
              style: TextStyle(
                color: AppColors.primary,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          // Canvas Area
          Expanded(
            child: Center(
              child: RepaintBoundary(
                key: _globalKey,
                child: Container(
                  constraints: const BoxConstraints(maxHeight: 500),
                  child: Stack(
                    alignment: Alignment.center,
                    children: [
                      // Base Image with Filters & Adjustments
                      ColorFiltered(
                        colorFilter: ColorFilter.matrix(
                          _calculateContrastMatrix(_contrast),
                        ),
                        child: ColorFiltered(
                          colorFilter: ColorFilter.matrix(
                            _calculateSaturationMatrix(_saturation),
                          ),
                          child: ColorFiltered(
                            colorFilter: ColorFilter.matrix(
                              _calculateBrightnessMatrix(_brightness),
                            ),
                            child: ColorFiltered(
                              colorFilter: ColorFilter.matrix(_currentFilter),
                              child: Image.file(
                                File(widget.imageFile.path),
                                fit: BoxFit.contain,
                              ),
                            ),
                          ),
                        ),
                      ),

                      // Layers (Text, Stickers)
                      ..._layers
                          .map((layer) => _buildLayerWidget(layer))
                          .toList(),

                      // Watermark
                      if (_showWatermark)
                        Positioned(
                          bottom: 20,
                          right: 20,
                          child: Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 4,
                            ),
                            color: Colors.black54,
                            child: const Text(
                              'SoloForte',
                              style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),

                      if (_showLogo)
                        Positioned(
                          top: 20,
                          left: 20,
                          child: Icon(
                            Icons.agriculture,
                            size: 40,
                            color: Colors.white.withOpacity(0.8),
                          ),
                        ),

                      // Crop Overlay
                      if (_isCropping)
                        Positioned.fill(
                          child: Container(
                            decoration: BoxDecoration(
                              border: Border.all(color: Colors.white, width: 2),
                              color: Colors.black54.withOpacity(0.5),
                            ),
                            child: Center(
                              child: Container(
                                width: 300,
                                height: 300,
                                decoration: BoxDecoration(
                                  border: Border.all(
                                    color: AppColors.primary,
                                    width: 2,
                                  ),
                                  color:
                                      Colors.transparent, // Cutout simulation
                                ),
                              ),
                            ),
                          ),
                        ),
                    ],
                  ),
                ),
              ),
            ),
          ),

          // Toolbar Icons
          Container(
            padding: EdgeInsets.symmetric(vertical: AppSpacing.sm),
            color: Colors.grey[900],
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                _buildToolIcon(Icons.palette, 'Filtros'),
                _buildToolIcon(Icons.tune, 'Ajustes'),
                _buildToolIcon(Icons.crop, 'Crop'),
                _buildToolIcon(Icons.text_fields, 'Texto'),
                _buildToolIcon(Icons.emoji_emotions, 'Sticker'),
                _buildToolIcon(Icons.data_usage, 'Dados'),
                _buildToolIcon(Icons.branding_watermark, 'Marca'),
              ],
            ),
          ),

          // Detailed Controls
          Container(
            height: 160,
            color: Colors.black,
            padding: EdgeInsets.all(AppSpacing.md),
            child: _buildControlPanel(),
          ),
        ],
      ),
    );
  }

  Widget _buildControlPanel() {
    switch (_activeTool) {
      case 'Filtros':
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Filtros', style: TextStyle(color: Colors.white)),
            const SizedBox(height: 12),
            Expanded(
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: [
                  _filterButton('Normal', _noFilter),
                  _filterButton('Vivid', _vividFilter),
                  _filterButton('P&B', _bwFilter),
                  _filterButton('Sépia', _sepiaFilter),
                  _filterButton('Invert', _invertFilter),
                ],
              ),
            ),
          ],
        );
      case 'Ajustes':
        return Column(
          children: [
            _sliderRow(
              'Brilho',
              _brightness,
              -1.0,
              1.0,
              (v) => _brightness = v,
            ),
            _sliderRow('Contraste', _contrast, 0.0, 3.0, (v) => _contrast = v),
            _sliderRow(
              'Saturação',
              _saturation,
              0.0,
              3.0,
              (v) => _saturation = v,
            ),
          ],
        );
      case 'Crop':
        return Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'Ajuste o enquadramento',
              style: TextStyle(color: Colors.grey),
            ),
            const SizedBox(height: 16),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton(
                  onPressed: () => setState(() => _isCropping = !_isCropping),
                  child: Text(_isCropping ? 'Aplicar' : 'Ativar Recorte'),
                ),
              ],
            ),
          ],
        );
      case 'Texto':
        return Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text(
                'Adicionar Texto',
                style: TextStyle(color: Colors.white),
              ),
              const SizedBox(height: 16),
              ElevatedButton.icon(
                onPressed: _addTextLayer,
                icon: const Icon(Icons.add),
                label: const Text('Novo Texto'),
              ),
            ],
          ),
        );
      case 'Sticker':
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Adicionar Sticker',
              style: TextStyle(color: Colors.white),
            ),
            const SizedBox(height: 12),
            Expanded(
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: [
                  _stickerButton('🌾'),
                  _stickerButton('🚜'),
                  _stickerButton('📍'),
                  _stickerButton('💪'),
                  _stickerButton('🌞'),
                  _stickerButton('🌧️'),
                  _stickerButton('📈'),
                  _stickerButton('⚠️'),
                  _stickerButton('✅'),
                  _stickerButton('SoloForte'),
                ],
              ),
            ),
          ],
        );
      case 'Dados':
        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Adicionar Dados',
              style: TextStyle(color: Colors.white),
            ),
            const SizedBox(height: 12),
            Expanded(
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: [
                  _dataButton('NDVI', const NdviChartStamp()),
                  _dataButton('Location', const LocationStamp()),
                  _dataButton('Produt.', const ProductivityStamp()),
                ],
              ),
            ),
          ],
        );
      case 'Marca':
        return Column(
          children: [
            SwitchListTile(
              title: const Text(
                'Marca d\'água',
                style: TextStyle(color: Colors.white),
              ),
              value: _showWatermark,
              onChanged: (v) => setState(() => _showWatermark = v),
              activeColor: AppColors.primary,
            ),
            SwitchListTile(
              title: const Text(
                'Logo do App',
                style: TextStyle(color: Colors.white),
              ),
              value: _showLogo,
              onChanged: (v) => setState(() => _showLogo = v),
              activeColor: AppColors.primary,
            ),
          ],
        );
      default:
        return Container();
    }
  }

  // --- Helpers ---

  Future<void> _saveImage() async {
    try {
      RenderRepaintBoundary? boundary =
          _globalKey.currentContext?.findRenderObject()
              as RenderRepaintBoundary?;
      if (boundary != null) {
        // ui.Image image = await boundary.toImage(pixelRatio: 3.0);
        // ByteData? byteData = await image.toByteData(format: ui.ImageByteFormat.png);
        // Uint8List pngBytes = byteData!.buffer.asUint8List();

        // Here we would perform the save logic, likely writing to a temp file and passing back
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Imagem salva (simulação)')),
        );
        Navigator.pop(context);
      }
    } catch (e) {
      debugPrint("Error saving image: $e");
    }
  }

  void _addTextLayer() {
    TextEditingController controller = TextEditingController();
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Inserir Texto'),
        content: TextField(
          controller: controller,
          autofocus: true,
          decoration: const InputDecoration(hintText: 'Digite aqui...'),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          TextButton(
            onPressed: () {
              if (controller.text.isNotEmpty) {
                setState(() {
                  _layers.add(
                    EditorLayer(
                      type: LayerType.text,
                      content: controller.text,
                      position: const Offset(0, 0),
                    ),
                  );
                });
                Navigator.pop(context);
              }
            },
            child: const Text('Adicionar'),
          ),
        ],
      ),
    );
  }

  Widget _buildLayerWidget(EditorLayer layer) {
    return Positioned(
      left: layer.position.dx == 0 && layer.position.dy == 0
          ? null
          : layer.position.dx,
      top: layer.position.dx == 0 && layer.position.dy == 0
          ? null
          : layer.position.dy,
      child: GestureDetector(
        onPanUpdate: (details) {
          setState(() {
            double currentX = layer.position.dx == 0
                ? MediaQuery.of(context).size.width / 2
                : layer.position.dx;
            double currentY = layer.position.dy == 0
                ? MediaQuery.of(context).size.height / 2
                : layer.position.dy;

            layer.position = Offset(
              currentX + details.delta.dx,
              currentY + details.delta.dy,
            );
          });
        },
        child: _buildLayerContent(layer),
      ),
    );
  }

  Widget _buildLayerContent(EditorLayer layer) {
    switch (layer.type) {
      case LayerType.text:
        return Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: Colors.black45,
            borderRadius: BorderRadius.circular(4),
            border: Border.all(color: Colors.white, width: 1),
          ),
          child: Text(
            layer.content,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
        );
      case LayerType.sticker:
        return Container(
          padding: const EdgeInsets.all(4),
          child: Text(layer.content, style: const TextStyle(fontSize: 40)),
        );
      case LayerType.widget:
        return layer.widget ?? const SizedBox();
    }
  }

  // --- UI Components ---

  Widget _buildToolIcon(IconData icon, String label) {
    final isActive = _activeTool == label;
    return GestureDetector(
      onTap: () => setState(() => _activeTool = label),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, color: isActive ? AppColors.primary : Colors.white),
          const SizedBox(height: 4),
          Text(
            label,
            style: TextStyle(
              color: isActive ? AppColors.primary : Colors.grey,
              fontSize: 10,
            ),
          ),
        ],
      ),
    );
  }

  Widget _filterButton(String name, List<double> filter) {
    return GestureDetector(
      onTap: () => setState(() => _currentFilter = filter),
      child: Padding(
        padding: const EdgeInsets.only(right: 12),
        child: Column(
          children: [
            Container(
              width: 50,
              height: 50,
              decoration: BoxDecoration(
                border: borderForFilter(filter),
                borderRadius: BorderRadius.circular(8),
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(6),
                child: ColorFiltered(
                  colorFilter: ColorFilter.matrix(filter),
                  child: Image.file(
                    File(widget.imageFile.path),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
            ),
            const SizedBox(height: 4),
            Text(
              name,
              style: const TextStyle(color: Colors.white, fontSize: 10),
            ),
          ],
        ),
      ),
    );
  }

  BoxBorder? borderForFilter(List<double> filter) {
    return _currentFilter == filter
        ? Border.all(color: AppColors.primary, width: 2)
        : null;
  }

  Widget _stickerButton(String emoji) {
    return GestureDetector(
      onTap: () {
        setState(() {
          _layers.add(
            EditorLayer(
              type: LayerType.sticker,
              content: emoji,
              position: const Offset(100, 100),
            ),
          );
        });
      },
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 8),
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: Colors.grey[800],
          shape: BoxShape.circle,
        ),
        child: Text(emoji, style: const TextStyle(fontSize: 24)),
      ),
    );
  }

  Widget _dataButton(String label, Widget widget) {
    return GestureDetector(
      onTap: () {
        setState(() {
          _layers.add(
            EditorLayer(
              type: LayerType.widget,
              content: label,
              position: const Offset(100, 100),
              widget: widget,
            ),
          );
        });
      },
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 8),
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: Colors.grey[800],
          shape: BoxShape.rectangle,
          borderRadius: BorderRadius.circular(8),
        ),
        child: Column(
          children: [
            Icon(Icons.widgets, color: Colors.white),
            Text(
              label,
              style: const TextStyle(fontSize: 10, color: Colors.white),
            ),
          ],
        ),
      ),
    );
  }

  Widget _sliderRow(
    String label,
    double value,
    double min,
    double max,
    ValueChanged<double> onChanged,
  ) {
    return Row(
      children: [
        SizedBox(
          width: 80,
          child: Text(
            label,
            style: const TextStyle(color: Colors.white, fontSize: 12),
          ),
        ),
        Expanded(
          child: Slider(
            value: value,
            min: min,
            max: max,
            onChanged: (v) => setState(() {
              onChanged(v);
            }),
            activeColor: AppColors.primary,
          ),
        ),
      ],
    );
  }

  // --- Logic ---

  List<double> _calculateBrightnessMatrix(double brightness) {
    // Brightness is an offset: value * 255 typically used, but here simpler
    final b = brightness * 100;
    return [1, 0, 0, 0, b, 0, 1, 0, 0, b, 0, 0, 1, 0, b, 0, 0, 0, 1, 0];
  }

  List<double> _calculateContrastMatrix(double contrast) {
    final t = (1.0 - contrast) / 2.0 * 255.0;
    return [
      contrast,
      0,
      0,
      0,
      t,
      0,
      contrast,
      0,
      0,
      t,
      0,
      0,
      contrast,
      0,
      t,
      0,
      0,
      0,
      1,
      0,
    ];
  }

  List<double> _calculateSaturationMatrix(double saturation) {
    final s = saturation;
    final invS = 1 - s;
    final R = 0.2126 * invS;
    final G = 0.7152 * invS;
    final B = 0.0722 * invS;

    return [
      R + s,
      G,
      B,
      0,
      0,
      R,
      G + s,
      B,
      0,
      0,
      R,
      G,
      B + s,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
    ];
  }

  // Matrix Presets
  static const List<double> _noFilter = [
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
  ];

  static const List<double> _bwFilter = [
    0.33,
    0.33,
    0.33,
    0.0,
    0,
    0.33,
    0.33,
    0.33,
    0.0,
    0,
    0.33,
    0.33,
    0.33,
    0.0,
    0,
    0.0,
    0.0,
    0.0,
    1.0,
    0,
  ];

  static const List<double> _sepiaFilter = [
    0.393,
    0.769,
    0.189,
    0,
    0,
    0.349,
    0.686,
    0.168,
    0,
    0,
    0.272,
    0.534,
    0.131,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
  ];

  static const List<double> _invertFilter = [
    -1,
    0,
    0,
    0,
    255,
    0,
    -1,
    0,
    0,
    255,
    0,
    0,
    -1,
    0,
    255,
    0,
    0,
    0,
    1,
    0,
  ];

  static const List<double> _vividFilter = [
    1.2,
    0,
    0,
    0,
    0,
    0,
    1.2,
    0,
    0,
    0,
    0,
    0,
    1.2,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
  ];
}

// --- Types ---

enum LayerType { text, sticker, widget }

class EditorLayer {
  final LayerType type;
  final String content;
  final Widget? widget; // For complex widgets like charts
  Offset position;
  double scale;
  double rotation;

  EditorLayer({
    required this.type,
    required this.content,
    required this.position,
    this.widget,
    this.scale = 1.0,
    this.rotation = 0.0,
  });
}
