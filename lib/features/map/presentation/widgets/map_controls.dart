import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';

class MapControls extends StatelessWidget {
  final MapController mapController;
  final VoidCallback onLocationPressed;
  final VoidCallback onLayersPressed;
  final VoidCallback onImportPressed;
  final VoidCallback onExportPressed;
  final VoidCallback onListPressed;

  const MapControls({
    super.key,
    required this.mapController,
    required this.onLocationPressed,
    required this.onLayersPressed,
    required this.onImportPressed,
    required this.onExportPressed,
    required this.onListPressed,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        _MapButton(
          icon: Icons.more_horiz,
          onPressed: () {
            // Show popup menu manually or use a custom widget?
            // Simplest is to pass context and showMenu from parent, or simply use PopupMenuButton here if styled correctly.
            // But _MapButton is InkWell.
            // Let's change _MapButton to open a bottom sheet or a menu.
            // For simplicity, let's just use showModalBottomSheet or similar style menu.
            showModalBottomSheet(
              context: context,
              builder: (ctx) => _MoreOptionsMenu(
                onImport: () {
                  Navigator.pop(ctx);
                  onImportPressed();
                },
                onExport: () {
                  Navigator.pop(ctx);
                  onExportPressed();
                },
              ),
            );
          },
        ),
        const SizedBox(height: 12),
        _MapButton(icon: Icons.list, onPressed: onListPressed),
        const SizedBox(height: 12),
        _MapButton(icon: Icons.layers_outlined, onPressed: onLayersPressed),
        const SizedBox(height: 12),
        _MapButton(icon: Icons.my_location, onPressed: onLocationPressed),
        const SizedBox(height: 12),
        _MapButton(
          icon: Icons.add,
          onPressed: () {
            final zoom = mapController.camera.zoom;
            mapController.move(mapController.camera.center, zoom + 1);
          },
        ),
        const SizedBox(height: 8),
        _MapButton(
          icon: Icons.remove,
          onPressed: () {
            final zoom = mapController.camera.zoom;
            mapController.move(mapController.camera.center, zoom - 1);
          },
        ),
      ],
    );
  }
}

class _MapButton extends StatelessWidget {
  final IconData icon;
  final VoidCallback onPressed;

  const _MapButton({required this.icon, required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.white,
      elevation: 4,
      shape: const CircleBorder(),
      child: InkWell(
        onTap: onPressed,
        customBorder: const CircleBorder(),
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Icon(icon, color: AppColors.textPrimary),
        ),
      ),
    );
  }
}

class _MoreOptionsMenu extends StatelessWidget {
  final VoidCallback onImport;
  final VoidCallback onExport;

  const _MoreOptionsMenu({required this.onImport, required this.onExport});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 20),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Text(
            'Ações',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 10),
          ListTile(
            leading: const Icon(Icons.upload_file),
            title: const Text('Importar KML/KMZ'),
            onTap: onImport,
          ),
          ListTile(
            leading: const Icon(Icons.download),
            title: const Text('Exportar KML'),
            onTap: onExport,
          ),
        ],
      ),
    );
  }
}
