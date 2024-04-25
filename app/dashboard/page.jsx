export default function Page() {
  return (
    <section className="flex flex-col items-center py-10 max-h-[100vh] overflow-hidden">
      <h1 className="font-bold text-3xl">Dashboard</h1>
      <div className="flex">
        <div className="flex flex-col items-center gap-4 w-[30vw] border-r-[0.2px] rounded-md">
          <h2>Complaints</h2>
          <p>View and manage complaints.</p>
        </div>
        <div className="flex flex-wrap gap-20 mt-20 w-full max-h-[80vh] overflow-scroll pt-5">
          <ComplaintCard />
          <ComplaintCard />
          <ComplaintCard />
          <ComplaintCard />
          <ComplaintCard />
          <ComplaintCard />
          <ComplaintCard />
          <ComplaintCard />
        </div>
      </div>
    </section>
  );
}

function ComplaintCard() {
  return (
    <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[10rem]">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <h2 className="dark:text-white text-black mt-4 text-sm font-light">
        Hover over this card to reveal an awesome effect. Running out of copy
        here.
      </h2>
      <p className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
        Watch me hover
      </p>
      <input type="checkbox" className="mt-4" />
    </div>
  );
}

function Icon({ className, ...rest }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
}
