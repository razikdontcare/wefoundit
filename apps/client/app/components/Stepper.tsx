interface StepperProps {
  step: number;
}

export default function Stepper({ step }: StepperProps) {
  return (
    <div className="flex justify-center items-center">
      {[1, 2, 3, 4].map((num, i) => (
        <div key={i} className="flex items-center">
          <div
            className={`w-6 h-6 rounded-full text-sm flex items-center justify-center ${
              step >= num ? "bg-blue-500 text-white" : "bg-gray-600 text-white"
            }`}
          >
            {num}
          </div>
          {i < 3 && <div className="w-20 h-1 bg-white"></div>}
        </div>
      ))}
    </div>
  );
}
