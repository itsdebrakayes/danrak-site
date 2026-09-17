import { Link } from 'react-router-dom';
import PageShell from '@/components/sections/PageShell';
import Seo from '@/components/seo/Seo';
import { formatDate } from '@/lib/date';
import { posts } from '@/data/posts';
import { SITE } from '@/data/site';
import { ID, breadcrumb } from '@/data/schema';

const Blog = () => (
  <PageShell
    hero={
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-forest/10 via-background to-brand-ocean/10" />
        <div className="content-shell relative py-14 md:py-20">
          <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-brand-forest font-semibold mb-4">
            Writing
          </p>
          <h1 className="font-black tracking-tight text-foreground">Notes on Healing & Storytelling</h1>
          <div className="w-24 h-1 my-6 rounded-full bg-gradient-to-r from-brand-forest via-brand-sky to-brand-crimson" />
          <p className="max-w-2xl text-lg text-muted-foreground">
            Essays from Stacy-Ann Smith on trauma, grief, intentional healing, Caribbean storytelling
            and the work of communicating honestly.
          </p>
        </div>
      </div>
    }
  >
    <Seo
      title="Notes on Healing & Storytelling | Stacy-Ann Smith"
      description="Essays by Jamaican author and broadcaster Stacy-Ann Smith on emotional healing, childhood trauma, grief, faith and Caribbean storytelling."
      path="/blog"
      schema={[
        {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          '@id': `${SITE.url}/blog#blog`,
          name: 'Notes on Healing & Storytelling',
          url: `${SITE.url}/blog`,
          publisher: { '@id': ID.org },
          author: { '@id': ID.person },
          blogPost: posts.map((p) => ({
            '@type': 'BlogPosting',
            headline: p.title,
            url: `${SITE.url}/blog/${p.slug}`,
            datePublished: p.datePublished,
            author: { '@id': ID.person },
          })),
        },
        breadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ]),
      ]}
    />

    <div className="content-shell py-12 max-w-3xl">
      {posts.length === 0 ? (
        <p className="text-muted-foreground">Articles are on the way.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((p) => (
            <li key={p.slug}>
              <article className="rounded-2xl border border-border bg-card/50 p-6 hover:border-brand-ocean/40 transition-colors">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-3">
                  <time dateTime={p.datePublished}>
                    {formatDate(p.datePublished)}
                  </time>
                  <span aria-hidden>·</span>
                  <span>{p.readingMinutes} min read</span>
                </div>
                <h2 className="font-bold text-foreground mb-2">
                  <Link to={`/blog/${p.slug}`} className="hover:text-brand-ocean transition-colors">
                    {p.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground mb-4">{p.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  </PageShell>
);

export default Blog;
