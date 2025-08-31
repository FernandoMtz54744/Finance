export default function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-16 h-16 border-3 border-t-transparent border-red-500 rounded-full animate-spin
                      border-b-yellow-500 border-l-green-500 border-r-blue-500">
      </div>
    </div>
  );
}
