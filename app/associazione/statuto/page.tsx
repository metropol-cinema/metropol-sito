import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { SITE } from '@/lib/site';

import { REGOLAMENTO, STATUTO, type Article, type Block } from './content';

export const metadata: Metadata = {
  title: 'Statuto e regolamento',
  description:
    'Lo statuto e il regolamento interno dell’Associazione Culturale Metropol di Villafranca di Verona.',
};

function BlockContent({ block }: { block: Block }) {
  switch (block.kind) {
    case 'p':
      return <p className="mt-3 text-sm leading-relaxed text-cinema-text-muted">{block.text}</p>;
    case 'sub':
      return <p className="mt-4 text-sm font-semibold text-cinema-text">{block.text}</p>;
    case 'list':
      return (
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-cinema-text-muted">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
  }
}

function ArticleSection({ article, level }: { article: Article; level: 3 | 4 }) {
  const Heading = level === 3 ? 'h3' : 'h4';
  return (
    <section id={article.id}>
      <Heading className="mt-7 font-bold tracking-tight text-cinema-text">{article.title}</Heading>
      {article.blocks.map((block, i) => (
        <BlockContent key={i} block={block} />
      ))}
    </section>
  );
}

export default function StatutoPage() {
  return (
    <main className="container max-w-3xl py-10 sm:py-12">
      <nav aria-label="Torna alla pagina dell'associazione" className="mb-6">
        <Link
          href="/associazione"
          className="inline-flex items-center gap-1.5 text-sm text-cinema-text-subtle transition-colors hover:text-cinema-text-muted"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> L&apos;Associazione
        </Link>
      </nav>

      <header className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-cinema-text sm:text-3xl">
          Statuto e regolamento interno
        </h1>
        <p className="mt-3 leading-relaxed text-cinema-text-muted">
          I documenti che regolano la vita dell&apos;{SITE.association}: lo statuto, che ne
          definisce finalità e organi, e il regolamento interno, che ne disciplina
          l&apos;organizzazione operativa.
        </p>
      </header>

      <section id="statuto" aria-labelledby="statuto-titolo">
        <h2
          id="statuto-titolo"
          className="border-b border-cinema-border pb-3 text-xl font-bold tracking-tight text-cinema-text"
        >
          Lo statuto
        </h2>
        {STATUTO.map((article) => (
          <ArticleSection key={article.id} article={article} level={3} />
        ))}
      </section>

      <section id="regolamento" aria-labelledby="regolamento-titolo" className="mt-14">
        <h2
          id="regolamento-titolo"
          className="border-b border-cinema-border pb-3 text-xl font-bold tracking-tight text-cinema-text"
        >
          Regolamento interno
        </h2>
        {REGOLAMENTO.map((chapter) => (
          <section key={chapter.id} id={chapter.id} className="mt-8">
            <h3 className="text-lg font-bold tracking-tight text-cinema-text">{chapter.title}</h3>
            {chapter.articles.map((article) => (
              <ArticleSection key={article.id} article={article} level={4} />
            ))}
          </section>
        ))}
      </section>
    </main>
  );
}
