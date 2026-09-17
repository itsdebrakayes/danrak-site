import { Link, useParams } from 'react-router-dom';
import PageShell from '@/components/sections/PageShell';
import Seo from '@/components/seo/Seo';
import { formatDate } from '@/lib/date';
import { getPost } from '@/data/posts';
import { BOOK, SITE } from '@/data/site';
import { ID, breadcrumb } from '@/data/schema';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  if (!post) {
    return (
      <PageShell>
        <Seo
          title="Article not found | Danrak Productions"
          description="This article could not be found."
          path={`/blog/${slug ?? ''}`}
          noindex
        />
        <div className="content-shell py-20 max-w-2xl text-center">
          <h1 className="font-bold text-foreground mb-3">Article not found</h1>
          <p className="text-muted-foreground mb-6">
            That article doesn’t exist, or the link has changed.
          </p>
          <Link to="/blog" className="text-brand-ocean font-semibold hover:underline">
            ← Back to all articles
          </Link>
        </div>
      </PageShell>
    );
  }

  const url = `${SITE.url}/blog/${post.slug}`;

  return (
    <PageShell>
      <Seo
        title={`${post.title} | Stacy-Ann Smith`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        keywords={post.tags}
        publishedTime={post.datePublished}
        modifiedTime={post.dateModified ?? post.datePublished}
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            '@id': `${url}#article`,
            headline: post.title,
            description: post.excerpt,
            url,
            datePublished: post.datePublished,
            dateModified: post.dateModified ?? post.datePublished,
            author: { '@id': ID.person },
            publisher: { '@id': ID.org },
            mainEntityOfPage: { '@type': 'WebPage', '@id': url },
            keywords: post.tags.join(', '),
            about: post.tags.map((t) => ({ '@type': 'Thing', name: t })),
            isPartOf: { '@id': `${SITE.url}/blog#blog` },
            mentions: { '@id': ID.book },
          },
          // Each section is a question with a self-contained answer, so the
          // article doubles as an FAQ source for answer engines.
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            mainEntity: post.sections.map((s) => ({
              '@type': 'Question',
              name: s.heading,
              acceptedAnswer: { '@type': 'Answer', text: s.answer },
            })),
          },
          breadcrumb([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article className="content-shell py-12 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-4">
          <Link to="/blog" className="text-brand-ocean font-semibold hover:underline">Blog</Link>
          <span aria-hidden>·</span>
          <time dateTime={post.datePublished}>
            {formatDate(post.datePublished)}
          </time>
          <span aria-hidden>·</span>
          <span>{post.readingMinutes} min read</span>
        </div>

        <h1 className="font-black tracking-tight text-foreground">{post.title}</h1>
        <div className="w-20 h-1 my-6 rounded-full bg-gradient-to-r from-brand-crimson via-brand-sky to-brand-forest" />
        <p className="text-lg text-muted-foreground">{post.intro}</p>

        {post.sections.map((s) => (
          <section key={s.heading} className="scroll-mt-24">
            <h2 className="font-bold text-foreground mt-12 mb-3">{s.heading}</h2>
            {/* Answer first — this paragraph must stand alone. */}
            <p className="text-foreground font-medium">{s.answer}</p>
            {s.body?.map((b, i) => (
              <p key={i} className="text-muted-foreground mt-4">{b}</p>
            ))}
          </section>
        ))}

        {post.closing && (
          <aside className="mt-14 rounded-2xl border border-border bg-gradient-to-br from-brand-crimson/5 to-brand-ocean/5 p-6 sm:p-8">
            <p className="text-muted-foreground">{post.closing}</p>
            <Link
              to="/time-does-not-heal"
              className="mt-4 inline-flex items-center rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Read about {BOOK.title} →
            </Link>
          </aside>
        )}
      </article>
    </PageShell>
  );
};

export default BlogPost;
