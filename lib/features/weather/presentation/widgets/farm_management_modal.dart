import 'package:flutter/material.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';

class FarmManagementModal extends StatefulWidget {
  final String currentLocation;
  final List<String> savedFarms;
  final Function(String) onLocationSelected;
  final Function(List<String>) onFarmsUpdated;

  const FarmManagementModal({
    super.key,
    required this.currentLocation,
    required this.savedFarms,
    required this.onLocationSelected,
    required this.onFarmsUpdated,
  });

  @override
  State<FarmManagementModal> createState() => _FarmManagementModalState();
}

class _FarmManagementModalState extends State<FarmManagementModal> {
  late List<String> _localSavedFarms;

  @override
  void initState() {
    super.initState();
    _localSavedFarms = List.from(widget.savedFarms);
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Gerenciar Fazendas', style: AppTypography.h3),
          const SizedBox(height: 16),

          // Add Current Location Button
          if (!_localSavedFarms.contains(widget.currentLocation) &&
              widget.currentLocation != 'CARREGANDO...')
            ListTile(
              leading: const Icon(
                Icons.add_location_alt,
                color: AppColors.primary,
              ),
              title: const Text('Salvar Local Atual'),
              subtitle: Text(widget.currentLocation),
              onTap: () {
                setState(() {
                  _localSavedFarms.add(widget.currentLocation);
                });
                widget.onFarmsUpdated(_localSavedFarms);
              },
            ),

          const Divider(),
          const SizedBox(height: 8),

          Expanded(
            child: ListView.builder(
              itemCount: _localSavedFarms.length,
              itemBuilder: (context, index) {
                final farm = _localSavedFarms[index];
                final isSelected = farm == widget.currentLocation;
                return ListTile(
                  leading: Icon(
                    Icons.landscape,
                    color: isSelected ? AppColors.primary : Colors.grey,
                  ),
                  title: Text(
                    farm,
                    style: TextStyle(
                      fontWeight: isSelected
                          ? FontWeight.bold
                          : FontWeight.normal,
                      color: isSelected ? AppColors.primary : Colors.black87,
                    ),
                  ),
                  trailing: IconButton(
                    icon: const Icon(Icons.delete_outline, color: Colors.red),
                    onPressed: () {
                      setState(() {
                        _localSavedFarms.removeAt(index);
                      });
                      widget.onFarmsUpdated(_localSavedFarms);
                      // If we deleted the currently selected location, switch to another if available
                      if (isSelected && _localSavedFarms.isNotEmpty) {
                        widget.onLocationSelected(_localSavedFarms.first);
                      }
                    },
                  ),
                  onTap: () {
                    widget.onLocationSelected(farm);
                    Navigator.pop(context);
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
