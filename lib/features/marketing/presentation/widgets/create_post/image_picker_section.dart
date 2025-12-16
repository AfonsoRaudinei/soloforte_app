import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:soloforte_app/core/theme/app_colors.dart';
import 'package:soloforte_app/core/theme/app_spacing.dart';
import 'package:soloforte_app/core/theme/app_typography.dart';

class ImagePickerSection extends StatelessWidget {
  final List<XFile> selectedImages;
  final Function(ImageSource) onPickImage;
  final Function(int) onRemoveImage;
  final Function(XFile) onEditImage;

  const ImagePickerSection({
    super.key,
    required this.selectedImages,
    required this.onPickImage,
    required this.onRemoveImage,
    required this.onEditImage,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        border: Border.all(color: AppColors.gray200),
        borderRadius: BorderRadius.circular(12),
      ),
      padding: EdgeInsets.all(AppSpacing.md),
      child: Column(
        children: [
          if (selectedImages.isNotEmpty)
            SizedBox(
              height: 120,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: selectedImages.length + 1,
                separatorBuilder: (_, __) => SizedBox(width: AppSpacing.sm),
                itemBuilder: (context, index) {
                  if (index == selectedImages.length) {
                    if (selectedImages.length >= 10) return const SizedBox();
                    return GestureDetector(
                      onTap: () => onPickImage(ImageSource.gallery),
                      child: Container(
                        width: 100,
                        decoration: BoxDecoration(
                          color: AppColors.gray100,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: const Icon(
                          Icons.add_a_photo,
                          color: AppColors.gray500,
                        ),
                      ),
                    );
                  }
                  final image = selectedImages[index];
                  return Stack(
                    children: [
                      GestureDetector(
                        onTap: () => onEditImage(image),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(8),
                          child: Image.file(
                            File(image.path),
                            width: 120,
                            height: 120,
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                      Positioned(
                        top: 4,
                        right: 4,
                        child: GestureDetector(
                          onTap: () => onRemoveImage(index),
                          child: Container(
                            padding: const EdgeInsets.all(4),
                            decoration: const BoxDecoration(
                              color: Colors.black54,
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(
                              Icons.close,
                              size: 16,
                              color: Colors.white,
                            ),
                          ),
                        ),
                      ),
                      Positioned(
                        bottom: 4,
                        right: 4,
                        child: Container(
                          padding: const EdgeInsets.all(4),
                          decoration: const BoxDecoration(
                            color: Colors.black54,
                            shape: BoxShape.circle,
                          ),
                          child: const Icon(
                            Icons.edit,
                            size: 16,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ],
                  );
                },
              ),
            )
          else
            GestureDetector(
              onTap: () {
                showModalBottomSheet(
                  context: context,
                  builder: (context) => SafeArea(
                    child: Wrap(
                      children: [
                        ListTile(
                          leading: const Icon(Icons.photo_library),
                          title: const Text('Galeria'),
                          onTap: () {
                            Navigator.pop(context);
                            onPickImage(ImageSource.gallery);
                          },
                        ),
                        ListTile(
                          leading: const Icon(Icons.camera_alt),
                          title: const Text('Câmera'),
                          onTap: () {
                            Navigator.pop(context);
                            onPickImage(ImageSource.camera);
                          },
                        ),
                      ],
                    ),
                  ),
                );
              },
              child: Container(
                height: 150,
                width: double.infinity,
                decoration: BoxDecoration(
                  color: AppColors.gray50,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: AppColors.gray200,
                    style: BorderStyle.solid,
                  ),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Icon(
                      Icons.add_photo_alternate,
                      size: 48,
                      color: AppColors.gray400,
                    ),
                    SizedBox(height: AppSpacing.sm),
                    Text(
                      'Toque para adicionar foto ou vídeo',
                      style: AppTypography.bodyMedium.copyWith(
                        color: AppColors.gray500,
                      ),
                    ),
                    Text(
                      'Até 10 fotos',
                      style: AppTypography.caption.copyWith(
                        color: AppColors.gray400,
                      ),
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}
