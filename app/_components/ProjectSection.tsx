interface SectionProps {
  title: string;
  content: string | string[] | Array<{ title: string; points: string[] }>;
  type: "text" | "list" | "features";
}

export function ProjectSection({ title, content, type }: SectionProps) {
  const renderContent = () => {
    switch (type) {
      case "text":
        return (
          <p className="text-lg sm:text-xl dark:text-gray-300 pt-5">
            {content as string}
          </p>
        );

      case "list":
        return (
          <ul className="list-disc pl-5 pt-5 space-y-2">
            {(content as string[]).map((item, index) => (
              <li key={index} className="text-lg dark:text-gray-300">
                {item}
              </li>
            ))}
          </ul>
        );

      case "features":
        return (
          <div className="grid md:grid-cols-2 gap-6 pt-5">
            {(content as Array<{ title: string; points: string[] }>).map(
              (feature, index) => (
                <div key={index} className="bg-zinc-800/50 p-5 rounded-lg">
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {feature.points.map((point, idx) => (
                      <li key={idx} className="dark:text-gray-300">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        );
    }
  };

  return (
    <section className="mt-10">
      <h2 className="font-incognito text-4xl font-bold">{title}</h2>
      {renderContent()}
    </section>
  );
}
