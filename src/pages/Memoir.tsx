import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { FaStar, FaAmazon } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import cover from '@/assets/time-does-not-heal-cover.jpg';

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
      <section className="memoir-hero-bg relative overflow-hidden min-h-screen flex items-center justify-center px-6 pt-28 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(var(--memoir-violet))] opacity-30 blur-3xl" />
          <div className="absolute bottom-10 right-16 w-5 h-5 rounded-full bg-[hsl(var(--memoir-lilac))]/60 animate-float blur-sm" />
          <div className="absolute top-1/3 left-20 w-6 h-6 rounded-full bg-[hsl(var(--memoir-lilac))]/40 animate-float blur-sm" style={{ animationDelay: '1.4s' }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
          <motion.img
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            src={cover}
            alt="Time Does Not Heal — book cover by Stacy-Ann Smith"
            className="w-44 sm:w-56 md:w-64 rounded-lg shadow-2xl"
            style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.55)' }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-8 uppercase tracking-[0.35em] text-sm text-[hsl(var(--memoir-lilac))]"
          >
            A Memoir by Stacy-Ann Smith
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="font-playfair font-bold text-5xl sm:text-6xl md:text-7xl mt-3 text-white leading-tight"
          >
            TIME DOES
            <span className="block text-[hsl(var(--memoir-lilac))]">NOT HEAL</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-5 text-lg text-white/80 max-w-xl"
          >
            Time alone doesn't heal all wounds. You have to be intentional about your healing — that's what this book is about.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
          >
            <a href={amazonUrl} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-initial">
              <Button size="lg" className="w-full sm:w-auto px-8 py-4 text-lg font-semibold rounded-lg shadow-lg bg-[hsl(var(--memoir-violet))] hover:bg-[hsl(var(--memoir-violet))]/85 text-white">
                <FaAmazon className="mr-2" /> Get the Book
              </Button>
            </a>
            <a href="#about-the-book" className="flex-1 sm:flex-initial">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto px-8 py-4 text-lg font-semibold rounded-lg shadow-lg bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm">
                Read the Story
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== About the Book ===== */}
      <section id="about-the-book" className="relative py-20 lg:py-28 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--memoir-violet))]/5 to-transparent" />
        <motion.div {...fadeIn} className="relative max-w-3xl mx-auto glass p-8 lg:p-12 rounded-3xl">
          <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-center mb-4 text-foreground">About the Book</h2>
          <div className="w-24 h-1 rounded-full mx-auto mb-8 bg-gradient-to-r from-[hsl(var(--memoir-violet))] via-[hsl(var(--brand-crimson))] to-[hsl(var(--memoir-lilac))]" />
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
        </motion.div>
      </section>

      {/* ===== Inside the Pages ===== */}
      <section className="relative py-20 lg:py-24 px-6">
        <motion.div {...fadeIn} className="text-center mb-12">
          <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-foreground">Inside the Pages</h2>
          <div className="w-24 h-1 rounded-full mx-auto mt-5 bg-gradient-to-r from-[hsl(var(--memoir-lilac))] via-[hsl(var(--memoir-violet))] to-[hsl(var(--brand-crimson))]" />
        </motion.div>
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {themes.map((t, i) => (
            <motion.div
              key={t.title}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: i * 0.12 }}
              className="memoir-card p-8 rounded-2xl"
            >
              <h3 className="font-playfair font-bold text-2xl mb-3 text-[hsl(var(--memoir-violet))]">{t.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{t.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== About the Author ===== */}
      <section className="relative py-20 lg:py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[hsl(var(--memoir-violet))]/5 to-transparent" />
        <motion.div {...fadeIn} className="relative max-w-3xl mx-auto glass p-8 lg:p-12 rounded-3xl">
          <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-center mb-4 text-foreground">Meet the Author</h2>
          <div className="w-24 h-1 rounded-full mx-auto mb-8 bg-gradient-to-r from-[hsl(var(--memoir-violet))] via-[hsl(var(--brand-crimson))] to-[hsl(var(--memoir-lilac))]" />
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Stacy-Ann Smith is an award-winning entrepreneur, communications specialist and the Founder & CEO of Danrak Productions. A trained journalist and broadcaster, she is the creator, executive producer and host of the acclaimed TV talk show <b className="text-foreground">It's A Woman's World</b>.
            </p>
            <p>
              A Kingston native, UWI graduate, wife and mother of two, she has spent nearly 25 years in media and communications — writing for national campaigns, producing television, and lending her voice to nationally televised events. <b className="text-foreground">Time Does Not Heal</b> is her first published book, written to help others do the intentional work of healing.
            </p>
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
      <section className="relative py-24 px-6 pb-32">
        <motion.div {...fadeIn} className="memoir-hero-bg rounded-3xl max-w-4xl mx-auto px-8 py-16 text-center overflow-hidden">
          <h2 className="font-playfair font-bold text-4xl sm:text-5xl text-white">Begin Your Healing</h2>
          <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
            Time Does Not Heal is available now on Amazon. Your healing won't wait for time — start today.
          </p>
          <a href={amazonUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-8">
            <Button size="lg" className="px-10 py-4 text-lg font-semibold rounded-lg shadow-lg bg-white text-[hsl(var(--memoir-violet))] hover:bg-white/90">
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
