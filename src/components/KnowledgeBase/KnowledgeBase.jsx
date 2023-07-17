import css from "./KnowledgeBase.module.css";

export const KnowledgeBase = () => {
  return (
    <div>
      <h1 className={css.header}>Knowledge Base</h1>
      <ol className={css.links}>
        <li>
          <a
            href="https://helltides.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Интерактивная карта
          </a>
          <span> скрытых сундуков на Helltide</span>
        </li>
        <li>
          <a
            href="https://discord.com/invite/diablo4"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Discord канал
          </a>
          <span> для покупки/продажи шмоток за голду</span>
        </li>
        <li>
          <span>Интерактивная </span>
          <a
            href="https://d4builds.gg/map/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            карта.
          </a>
          <span> Расположение алтарей лилит, подземелий, квестов и прочее. </span>
        </li>
        <li>
          {" "}
          <a
            href="https://diablo4.life/tools/gambling"
            target="_blank"
            rel="noopener noreferrer"
          >
            {" "}
            Gambling
          </a>
          <span> Ввероятности выпадения аспекта за оболы</span>
        </li>
        <li>
          <a
            href="https://rankedboost.com/diablo-4/monsters-list/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Drop list
          </a>
          <span> Вероятность выпадения предметов из монстров</span>
        </li>
      </ol>
    </div>
  );
};
