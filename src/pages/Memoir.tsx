import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { FaStar, FaAmazon } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import cover from '@/assets/time-does-not-heal-cover.jpg';
import authorPortrait from '@/assets/hero-arms-folded.jpg';

const amazonUrl = 'https://www.amazon.com/Time-Does-Heal-Stacy-Ann-Smith-ebook/dp/B08ZXVVMGV';

const fadeIn = {
  initial: { y: 30, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.7, ease: 'easeOut' as const },
};

const themes = [
  {
    title: 'The Valley & the Mountaintop',
    body: 'Growing up in Maverley, Kingston, Stacy-Ann traces the struggle, pain and loss of her early years — and the climb back to the mountaintop.',
  },
  {
    title: 'Lessons from My Clothespin',
    body: 'A single childhood moment with a clothespin shaped years of negative self-perception — until she learned to rewrite the story she told herself.',
  },
  {
    title: 'Faith, Family & Intentional Healing',
    body: 'Through a failed marriage, the death of her father and seasons of brokenness, faith and the willingness to seek help became the path to wholeness.',
  },
];

const Memoir = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Header />

      {/* ===== Hero ===== */}
      <section className="memoir-editorial-hero relative min-h-screen overflow-hidden px-5 pb-24 pt-32 sm:px-8 lg:pb-32">
        <div className="memoir-splash memoir-splash-left" aria-hidden="true" />
        <div className="memoir-splash memoir-splash-right" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="mb-5 text-xs font-semibold uppercase text-muted-foreground sm:text-sm"
          >
            A Memoir by Stacy-Ann Smith
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="memoir-display-title font-playfair font-bold uppercase leading-none text-foreground"
          >
            <span className="text-[hsl(var(--memoir-violet))]">Time</span>{' '}
            <span>Does</span>{' '}
            <span className="text-[hsl(var(--memoir-lilac-strong))]">Not</span>{' '}
            <span>Heal</span>
          </motion.h1>

          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 34 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
            className="memoir-cover-wrap relative mt-10 sm:mt-14"
          >
            <div className="memoir-cover-splash memoir-cover-splash-left" aria-hidden="true" />
            <div className="memoir-cover-splash memoir-cover-splash-right" aria-hidden="true" />
            <div className="memoir-cover-glow" aria-hidden="true" />
            <img
              src={cover}
              alt="Time Does Not Heal by Stacy-Ann Smith"
              width="500"
              height="500"
              className="relative z-10 w-[min(82vw,31rem)] object-contain"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.45 }}
            className="mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Time alone doesn't heal all wounds. You have to be intentional about your healing — that's what this book is about.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.55 }}
            className="mt-8 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row"
          >
            <Button asChild size="lg" className="w-full px-8 py-4 text-lg font-semibold shadow-lg sm:w-auto">
              <a href={amazonUrl} target="_blank" rel="noopener noreferrer">
                <FaAmazon /> Get the Book
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary" className="w-full px-8 py-4 text-lg font-semibold shadow-lg sm:w-auto">
              <a href="#about-the-book">Read the Story</a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ===== About the Book ===== */}
      <section id="about-the-book" className="relative overflow-hidden px-6 py-24 lg:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-brand-crimson/3 to-brand-forest/5" />
        <motion.div {...fadeIn} className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="relative lg:col-span-5">
            <img src={cover} alt="Time Does Not Heal memoir" loading="lazy" width="500" height="500" className="w-full object-cover shadow-2xl" />
            <blockquote className="memoir-quote-note absolute -right-3 -top-10 max-w-[15rem] rotate-2 p-5 text-left sm:-right-8 sm:-top-8">
              <p className="font-playfair text-xl font-bold leading-snug text-foreground">“You have to be intentional about your healing.”</p>
              <footer className="mt-3 text-xs font-semibold uppercase text-[hsl(var(--memoir-violet))]">— Stacy-Ann Smith</footer>
            </blockquote>
          </div>
          <div className="glass p-8 lg:col-span-7 lg:p-12 rounded-3xl">
            <h2 className="font-playfair text-4xl font-bold text-foreground sm:text-5xl">About the Book</h2>
            <div className="my-7 h-1 w-24 rounded-full bg-gradient-to-r from-[hsl(var(--memoir-violet))] via-brand-crimson to-[hsl(var(--memoir-lilac))]" />
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p className="text-xl font-semibold text-foreground">
              In a compelling, message-driven memoir, Jamaican journalist and TV talk show host Stacy-Ann Smith boldly challenges the widely accepted view that time alone can heal all wounds.
            </p>
            <p>
              "There are so many people walking around, going through life in a state of brokenness, waiting on time to miraculously fix what ails them. But mental health professionals will tell you that time alone does not heal all wounds. You have to be intentional about your healing, and that's what this book is about."
            </p>
            <p>
              Tracing her experience with childhood trauma, a failed marriage and the impact of the death of her father, Smith readily admits that she, like many people, struggled to function. Her hope is that through her experiences, those struggling with heartbreak, guilt and pain will be motivated to take the necessary steps to pursue healing.
            </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== Inside the Pages ===== */}
      <section className="memoir-pages-section relative overflow-hidden px-6 py-24 lg:py-32">
        <motion.div {...fadeIn} className="relative mx-auto mb-12 max-w-7xl text-left lg:mb-16">
          <p className="mb-3 text-sm font-semibold uppercase text-[hsl(var(--memoir-violet))]">Reflections from the memoir</p>
          <h2 className="font-playfair text-4xl font-bold text-foreground sm:text-6xl">Inside the Pages</h2>
        </motion.div>
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {themes.map((t, i) => (
            <motion.div
              key={t.title}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: i * 0.12 }}
              className={`glass rounded-xl p-6 ${i === 0 ? 'service-box-crimson' : i === 1 ? 'service-box-ocean' : 'service-box-forest'}`}
            >
              <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">Chapter {String(i + 1).padStart(2, '0')}</p>
              <h3 className={`mb-3 font-playfair text-2xl font-bold ${i === 0 ? 'text-brand-crimson' : i === 1 ? 'text-brand-ocean' : 'text-brand-forest'}`}>{t.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{t.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== About the Author ===== */}
      <section className="relative overflow-hidden px-6 py-24 lg:py-36">
        <motion.div {...fadeIn} className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="glass order-2 p-8 rounded-3xl lg:order-1 lg:col-span-7 lg:p-12">
            <p className="mb-3 text-sm font-semibold uppercase text-brand-crimson">The voice behind the words</p>
            <h2 className="font-playfair text-4xl font-bold text-foreground sm:text-5xl">Meet Stacy-Ann Smith</h2>
            <div className="my-7 h-1 w-24 rounded-full bg-gradient-to-r from-[hsl(var(--memoir-violet))] via-brand-crimson to-[hsl(var(--memoir-lilac))]" />
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Stacy-Ann Smith is an award-winning entrepreneur, communications specialist and the Founder & CEO of Danrak Productions. A trained journalist and broadcaster, she is the creator, executive producer and host of the acclaimed TV talk show <b className="text-foreground">It's A Woman's World</b>.
            </p>
            <p>
              A Kingston native, UWI graduate, wife and mother of two, she has spent nearly 25 years in media and communications — writing for national campaigns, producing television, and lending her voice to nationally televised events. <b className="text-foreground">Time Does Not Heal</b> is her first published book, written to help others do the intentional work of healing.
            </p>
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-5">
            <img src={authorPortrait} alt="Stacy-Ann Smith" loading="lazy" width="4672" height="7008" className="mx-auto aspect-[2/3] max-h-[44rem] w-full object-cover object-top shadow-2xl" />
          </div>
        </motion.div>
      </section>

      {/* ===== Praise ===== */}
      <section className="relative py-20 lg:py-24 px-6">
        <motion.div {...fadeIn} className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-1 text-2xl mb-4 text-[hsl(var(--memoir-violet))]">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i === 4 ? 'opacity-80' : ''} />
            ))}
          </div>
          <p className="font-playfair font-bold text-3xl sm:text-4xl text-foreground mb-2">4.8 out of 5</p>
          <p className="text-muted-foreground mb-8">from readers on Amazon</p>
          <blockquote className="memoir-card p-8 rounded-2xl text-left">
            <p className="text-lg leading-relaxed text-muted-foreground italic">
              "A raw, honest and necessary read. Stacy-Ann reminds us that healing is a decision, not a waiting room."
            </p>
            <footer className="mt-4 text-sm font-semibold text-foreground">— Reader review</footer>
          </blockquote>
        </motion.div>
      </section>

      {/* ===== Get the Book ===== */}
      <section className="relative px-6 pb-32 py-24">
        <motion.div {...fadeIn} className="memoir-cta mx-auto max-w-4xl overflow-hidden rounded-3xl px-8 py-16 text-center">
          <h2 className="font-playfair text-4xl font-bold text-background sm:text-5xl">Begin Your Healing</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-background/80">
            Time Does Not Heal is available now on Amazon. Your healing won't wait for time — start today.
          </p>
          <a href={amazonUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-8">
            <Button size="lg" variant="secondary" className="px-10 py-4 text-lg font-semibold shadow-lg">
              <FaAmazon className="mr-2" /> Get the Book on Amazon
            </Button>
          </a>
        </motion.div>
      </section>

      <Footer variant="static" />
    </div>
  );
};

export default Memoir;
