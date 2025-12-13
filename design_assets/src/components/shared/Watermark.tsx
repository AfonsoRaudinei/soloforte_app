import logoWatermark from 'figma:asset/1470986629f76fb4c7c919d2ef4dd78b1031e335.png';

export default function Watermark() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
      <img 
        src={logoWatermark} 
        alt="" 
        className="w-64 h-64 opacity-[0.03] select-none"
        draggable={false}
      />
    </div>
  );
}
