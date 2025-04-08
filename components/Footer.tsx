export default function Footer() {
  return (
    <div className="w-full py-5">
      <div className="flex flex-col items-center gap-2.5">
        <p className="text-center text-xl font-bold">WEB2 assignment 2</p>
        <div className="space-y-1">
          <p className="text-center text-sm">Made by Frederik Handberg</p>
          <p className="text-center text-sm">
            GitHub:{" "}
            <a
              href="https://github.com/frederikhandberg0709/pokemon-project"
              target="_blank"
              className="text-blue-400 hover:text-blue-500 hover:underline"
            >
              https://github.com/frederikhandberg0709/pokemon-project
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
