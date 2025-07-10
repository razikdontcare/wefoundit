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
              step >= num ? "bg-blue-500 text-white" : "dark:bg-white bg-gray-900 dark:text-black"
            }`}
          >
            {num}
          </div>
          {i < 3 && (
            <div 
              className={`w-10 h-1 transition-all duration-300 ${
                step > num ? "bg-blue-500" : "dark:bg-white bg-gray-900"
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}

