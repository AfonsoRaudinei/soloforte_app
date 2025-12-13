import { useState, useRef, useEffect, memo } from 'react';
import { Camera, X, RotateCw, Check, Image as ImageIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';
import { camera as capacitorCamera } from '../utils/camera/capacitor-camera';
import { logger } from '../utils/logger';

interface CameraCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageDataUrl: string) => void;
}

const CameraCapture = memo(function CameraCapture({ isOpen, onClose, onCapture }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [isLoading, setIsLoading] = useState(false);
  const [useNativeCamera, setUseNativeCamera] = useState(false);
  const [permissionState, setPermissionState] = useState<'prompt' | 'granted' | 'denied'>('prompt');
  const [showWebOptions, setShowWebOptions] = useState(false);

  // ✅ Detectar se é Capacitor NATIVO (não web)
  const isCapacitorNative = (() => {
    try {
      const cap = (window as any).Capacitor;
      if (!cap) return false;
      const platform = cap.getPlatform?.();
      return platform === 'ios' || platform === 'android';
    } catch {
      return false;
    }
  })();

  // ✅ NÃO iniciar câmera automaticamente em ambiente web
  // Apenas em ambiente nativo Capacitor
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setShowWebOptions(false);
      setPermissionState('prompt');
      return;
    }

    // Em ambiente nativo, iniciar automaticamente
    if (isCapacitorNative && !useNativeCamera) {
      startCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode, useNativeCamera]);

  /**
   * ✅ CAMERA NATIVA CAPACITOR
   * 
   * Abre a camera nativa do dispositivo (iOS/Android)
   */
  const openNativeCamera = async () => {
    try {
      setIsLoading(true);
      logger.log('📸 Opening native camera...');

      const photo = await capacitorCamera.takePhoto({
        quality: 90,
        width: 1920,
        height: 1080,
        correctOrientation: true,
        saveToGallery: false,
        source: 'camera',
        allowEditing: true,
        withGeolocation: true
      });

      if (photo) {
        logger.log('✅ Photo captured from native camera');
        setCapturedImage(photo.imageUrl);
        toast.success('Foto capturada!', {
          description: `Tamanho: ${(photo.size / 1024).toFixed(0)} KB`
        });
      } else {
        logger.log('⚠️ Camera cancelled by user');
        onClose();
      }

      setIsLoading(false);
    } catch (error: any) {
      logger.error('❌ Native camera error:', error);
      
      let errorMessage = 'Erro ao abrir câmera';
      let errorDescription = 'Verifique as permissões do app';
      
      // Tratamento específico de erros do Capacitor
      if (error.message?.includes('permission')) {
        errorMessage = 'Permissão negada';
        errorDescription = 'Permita o acesso à câmera nas configurações do dispositivo';
      } else if (error.message?.includes('cancelled') || error.message?.includes('canceled')) {
        // Usuário cancelou - não mostrar erro
        logger.log('📷 Camera cancelled by user');
        setIsLoading(false);
        onClose();
        return;
      } else if (error.message?.includes('not available')) {
        errorMessage = 'Câmera não disponível';
        errorDescription = 'Este dispositivo não possui câmera';
      }
      
      toast.error(errorMessage, {
        description: errorDescription
      });
      setIsLoading(false);
      onClose();
    }
  };

  /**
   * ✅ ESCOLHER DA GALERIA
   */
  const openGallery = async () => {
    try {
      setIsLoading(true);
      logger.log('🖼️ Opening gallery...');

      const photo = await capacitorCamera.pickFromGallery({
        quality: 90,
        width: 1920,
        height: 1080
      });

      if (photo) {
        logger.log('✅ Photo selected from gallery');
        setCapturedImage(photo.imageUrl);
        toast.success('Foto selecionada!');
      } else {
        onClose();
      }

      setIsLoading(false);
    } catch (error: any) {
      logger.error('❌ Gallery error:', error);
      
      // Não mostrar erro se o usuário cancelou
      if (error.message?.includes('cancelled') || error.message?.includes('canceled')) {
        logger.log('🖼️ Gallery cancelled by user');
        setIsLoading(false);
        onClose();
        return;
      }
      
      let errorMessage = 'Erro ao abrir galeria';
      let errorDescription = 'Tente novamente';
      
      if (error.message?.includes('permission')) {
        errorMessage = 'Permissão negada';
        errorDescription = 'Permita o acesso à galeria nas configurações';
      }
      
      toast.error(errorMessage, {
        description: errorDescription
      });
      setIsLoading(false);
      onClose();
    }
  };

  const startCamera = async () => {
    try {
      setIsLoading(true);
      
      // Parar stream anterior se existir
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      // Verificar se getUserMedia está disponível
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API not available');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      });

      setStream(mediaStream);
      setPermissionState('granted');
      setShowWebOptions(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
      
      setIsLoading(false);
    } catch (error: any) {
      // ✅ IMPORTANTE: Não logar erro se for apenas permissão negada em ambiente web
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        // Permissão negada - comportamento esperado em ambiente web
        setPermissionState('denied');
        setIsLoading(false);
        // NÃO mostrar toast nem fechar - deixar usuário decidir
        return;
      }
      
      logger.error('❌ Camera access error:', error);
      
      // Tratamento específico por tipo de erro
      let errorMessage = 'Não foi possível acessar a câmera';
      let errorDescription = 'Verifique as permissões do navegador';
      
      if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        errorMessage = 'Câmera não encontrada';
        errorDescription = 'Nenhuma câmera foi detectada no dispositivo';
        setPermissionState('denied');
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        errorMessage = 'Câmera em uso';
        errorDescription = 'A câmera pode estar sendo usada por outro aplicativo';
      } else if (error.name === 'OverconstrainedError' || error.name === 'ConstraintNotSatisfiedError') {
        errorMessage = 'Configuração não suportada';
        errorDescription = 'As configurações da câmera não são suportadas';
      } else if (error.message === 'Camera API not available') {
        errorMessage = 'API não disponível';
        errorDescription = 'Este navegador não suporta acesso à câmera';
        setPermissionState('denied');
      }
      
      toast.error(errorMessage, {
        description: errorDescription
      });
      
      setIsLoading(false);
      setPermissionState('denied');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCapturedImage(null);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Configurar canvas com dimensões do vídeo
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Desenhar frame atual do vídeo no canvas
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Converter para data URL
      const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setCapturedImage(imageDataUrl);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const confirmPhoto = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      setCapturedImage(null);
      stopCamera();
      onClose();
      toast.success('Foto adicionada com sucesso!');
    }
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl p-0">
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-[#0057FF]" />
              Capturar Foto
            </DialogTitle>
          </div>
          <DialogDescription className="sr-only">
            Capture uma foto usando a câmera do dispositivo ou selecione uma imagem da galeria
          </DialogDescription>
        </DialogHeader>

        {/* ✅ OPÇÕES DE CAMERA NATIVA (apenas em apps nativos iOS/Android) */}
        {isCapacitorNative && !capturedImage && (
          <div className="px-6 pb-4 space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              📱 Camera nativa disponível! Escolha uma opção:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={openNativeCamera}
                disabled={isLoading}
                className="gap-2 bg-[#0057FF] hover:bg-[#0046CC]"
              >
                <Camera className="h-4 w-4" />
                Camera Nativa
              </Button>
              <Button
                onClick={openGallery}
                disabled={isLoading}
                variant="outline"
                className="gap-2"
              >
                <ImageIcon className="h-4 w-4" />
                Galeria
              </Button>
            </div>
            {!stream && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  💡 <strong>Dica:</strong> Use a camera nativa para melhor qualidade e acesso ao GPS
                </p>
              </div>
            )}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-950 px-2 text-gray-500">
                  ou use a camera web
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ✅ OPÇÕES WEB (quando não é Capacitor nativo) */}
        {!isCapacitorNative && !capturedImage && permissionState === 'prompt' && (
          <div className="px-6 pb-4 space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              📸 Escolha como deseja adicionar a foto:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={startCamera}
                disabled={isLoading}
                className="gap-2 bg-[#0057FF] hover:bg-[#0046CC]"
              >
                <Camera className="h-4 w-4" />
                Abrir Câmera
              </Button>
              <Button
                onClick={openGallery}
                disabled={isLoading}
                variant="outline"
                className="gap-2"
              >
                <ImageIcon className="h-4 w-4" />
                Escolher Arquivo
              </Button>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-xs text-amber-700 dark:text-amber-300">
                ⚠️ <strong>Importante:</strong> Ao clicar em "Abrir Câmera", você precisará permitir o acesso à câmera no navegador.
              </p>
            </div>
          </div>
        )}

        {/* ✅ ERRO DE PERMISSÃO NEGADA */}
        {!isCapacitorNative && permissionState === 'denied' && !capturedImage && (
          <div className="px-6 pb-4 space-y-3">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-red-800 dark:text-red-300 mb-1">
                    Permissão de câmera negada
                  </h4>
                  <p className="text-xs text-red-700 dark:text-red-400 mb-3">
                    Para usar a câmera, você precisa permitir o acesso nas configurações do navegador.
                  </p>
                  <ol className="text-xs text-red-600 dark:text-red-400 space-y-1 ml-4 list-decimal">
                    <li>Clique no ícone de cadeado 🔒 na barra de endereço</li>
                    <li>Localize "Câmera" ou "Permissões"</li>
                    <li>Altere para "Permitir"</li>
                    <li>Recarregue a página</li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Ou escolha uma foto da galeria:
              </p>
              <Button
                onClick={openGallery}
                disabled={isLoading}
                variant="outline"
                className="gap-2"
              >
                <ImageIcon className="h-4 w-4" />
                Escolher da Galeria
              </Button>
            </div>
          </div>
        )}

        <div className="relative bg-black">
          {isLoading ? (
            <div className="aspect-[4/3] flex items-center justify-center">
              <div className="text-center text-white">
                <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
                <p>Acessando câmera...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Vídeo da câmera */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full aspect-[4/3] object-cover ${capturedImage ? 'hidden' : 'block'}`}
              />

              {/* Imagem capturada */}
              {capturedImage && (
                <img
                  src={capturedImage}
                  alt="Foto capturada"
                  className="w-full aspect-[4/3] object-cover"
                />
              )}

              {/* Canvas oculto para captura */}
              <canvas ref={canvasRef} className="hidden" />

              {/* Grid overlay para ajudar no enquadramento */}
              {!capturedImage && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="border border-white/20"></div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Controles */}
        <div className="p-6 bg-gray-50 dark:bg-gray-900">
          {!capturedImage ? (
            <div className="flex items-center justify-between gap-4">
              {/* Botão alternar câmera (frontal/traseira) */}
              <Button
                onClick={toggleCamera}
                variant="outline"
                className="flex-1 gap-2"
                disabled={isLoading}
              >
                <RotateCw className="h-4 w-4" />
                Virar
              </Button>

              {/* Botão capturar */}
              <button
                onClick={capturePhoto}
                disabled={isLoading}
                className="h-16 w-16 bg-[#0057FF] hover:bg-[#0046CC] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="h-14 w-14 border-4 border-white rounded-full flex items-center justify-center">
                  <div className="h-10 w-10 bg-white rounded-full"></div>
                </div>
              </button>

              {/* Espaço para manter simetria */}
              <div className="flex-1"></div>
            </div>
          ) : (
            <div className="flex gap-3">
              {/* Botão tirar outra */}
              <Button
                onClick={retakePhoto}
                variant="outline"
                className="flex-1 gap-2"
              >
                <RotateCw className="h-4 w-4" />
                Tirar outra
              </Button>

              {/* Botão confirmar */}
              <Button
                onClick={confirmPhoto}
                className="flex-1 bg-[#0057FF] hover:bg-[#0046CC] gap-2"
              >
                <Check className="h-4 w-4" />
                Usar esta foto
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
});

export default CameraCapture;