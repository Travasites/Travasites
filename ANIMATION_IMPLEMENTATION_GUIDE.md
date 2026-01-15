# UI Animation Implementation Guide

**Date:** January 15, 2026  
**Updated:** Enhanced animations library with 30+ variants

---

## 📦 New Animation Components & Variants

### 1. Enhanced Animations Library
**File:** `src/lib/animations.ts`

**Added 30+ new animation variants:**
- Slide animations: `slideInFromLeft`, `slideInFromRight`, `slideInFromBottom`
- Entrance: `rotateIn`, `bounceIn`
- Hover effects: `hoverScale`, `hoverLift`, `hoverGlow`
- Tap effects: `tapScale`, `tapRotate`
- Scroll: `scrollReveal`
- Loading: `shimmer`, `breathe`
- Icon animations: `spin`, `bounce`, `wobble`, `swirl`
- Feedback: `flash`, `shake`, `successCheck`
- Lists: `staggerList`, `staggerListItem`
- Gradients: `gradientShift`
- Advanced: `parallaxHero`, `cardFlip`, `textReveal`

---

## 🎨 New Reusable Components

### 2. AnimatedCard Component
**File:** `src/components/AnimatedCard.tsx`

**Features:**
- 4 animation variants: `default`, `glow`, `lift`, `scale`
- Scroll-triggered entrance animations
- Configurable delay
- Smooth hover and tap interactions

**Usage:**
```tsx
import { AnimatedCard } from "@/components/AnimatedCard";

// Default variant
<AnimatedCard>
  <h3>Card Title</h3>
  <p>Card content here</p>
</AnimatedCard>

// Glow variant
<AnimatedCard variant="glow">
  <h3>Glowing Card</h3>
</AnimatedCard>

// With delay
<AnimatedCard variant="lift" delay={0.2}>
  <h3>Lifted Card</h3>
</AnimatedCard>
```

---

### 3. AnimatedButton Component
**File:** `src/components/AnimatedButton.tsx`

**Features:**
- 4 animation variants: `default`, `glow`, `pulse`, `float`
- Optional ripple effect on click
- Smooth entrance animation
- Accessible and responsive

**Usage:**
```tsx
import { AnimatedButton } from "@/components/AnimatedButton";

// Default animated button
<AnimatedButton>Click Me</AnimatedButton>

// Glowing button
<AnimatedButton variant="glow" className="bg-accent-gradient">
  Glow Effect
</AnimatedButton>

// Pulsing button with ripple
<AnimatedButton variant="pulse" ripple={true}>
  Premium Effect
</AnimatedButton>

// Floating button
<AnimatedButton variant="float" size="lg">
  Float Animation
</AnimatedButton>
```

---

### 4. Shimmer Loading Component
**File:** `src/components/Shimmer.tsx`

**Features:**
- Smooth loading skeleton with shimmer effect
- Pre-built skeletons: `Shimmer`, `CardShimmer`, `TableRowShimmer`
- Customizable size and count

**Usage:**
```tsx
import { Shimmer, CardShimmer, TableRowShimmer } from "@/components/Shimmer";

// Basic shimmer
<Shimmer width="100%" height="2rem" count={3} />

// Card skeleton
<CardShimmer count={2} />

// Table row skeleton
<TableRowShimmer columns={5} />
```

---

### 5. AnimatedHeroBackground Component
**File:** `src/components/AnimatedHeroBackground.tsx`

**Features:**
- 4 background animation variants
- Animated gradient mesh
- Floating glowing orbs
- GPU-optimized animations

**Variants:**
1. **AnimatedHeroBackground** (DEFAULT) - Gradient mesh + floating orbs
2. **GridGlowBackground** - Grid pattern with glow lines
3. **ParticleBackground** - Floating particles system
4. **AuroraBackground** - Aurora stripes effect

**Usage:**
```tsx
import { 
  AnimatedHeroBackground, 
  GridGlowBackground, 
  ParticleBackground,
  AuroraBackground 
} from "@/components/AnimatedHeroBackground";

// In hero section
<section className="relative min-h-[90vh] overflow-hidden">
  <AnimatedHeroBackground />
  {/* Your hero content */}
</section>

// Alternative: Grid background
<GridGlowBackground />

// Alternative: Particles
<ParticleBackground />

// Alternative: Aurora
<AuroraBackground />
```

---

## 🎯 Quick Implementation Guide

### Step 1: Update Service Cards (DONE)
Already updated in `src/pages/Index.tsx`:
```tsx
<motion.div
  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
  whileTap={{ scale: 0.95 }}
>
  {/* Card content */}
</motion.div>
```

### Step 2: Update Product Cards
**File:** `src/pages/Products.tsx`

```tsx
import { AnimatedCard } from "@/components/AnimatedCard";

// Replace existing divs with AnimatedCard
{products.map((product, index) => (
  <AnimatedCard key={index} variant="lift" delay={index * 0.1}>
    {/* Product content */}
  </AnimatedCard>
))}
```

### Step 3: Update CTA Buttons
**File:** `src/pages/*.tsx`

```tsx
import { AnimatedButton } from "@/components/AnimatedButton";

// Replace Button with AnimatedButton
<AnimatedButton 
  variant="glow" 
  ripple={true}
  className="bg-accent-gradient text-accent-foreground"
>
  Enter The Forge
</AnimatedButton>
```

### Step 4: Add Loading Skeletons
**File:** `src/pages/AIStudio.tsx`

```tsx
import { CardShimmer } from "@/components/Shimmer";

// During loading
{isLoading ? (
  <CardShimmer count={3} />
) : (
  // Your content
)}
```

### Step 5: Implement Scroll Animations
Use the `scrollReveal` animation on sections:

```tsx
import { scrollReveal } from "@/lib/animations";

<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={scrollReveal}
>
  {/* Content reveals on scroll */}
</motion.div>
```

---

## 🚀 Implementation Checklist

### HIGH PRIORITY (This Week)
- [x] Enhanced animations library (`src/lib/animations.ts`)
- [x] AnimatedCard component
- [x] AnimatedButton component
- [x] Shimmer component
- [x] AnimatedHeroBackground component
- [x] Update Index.tsx with new hero background
- [ ] Update Products.tsx page
- [ ] Update Labs.tsx page
- [ ] Update Services section cards
- [ ] Update AI Studio page

### MEDIUM PRIORITY (Next Week)
- [ ] Add animations to Navbar menu items
- [ ] Enhance form inputs with focus animations
- [ ] Add animations to mobile menu
- [ ] Implement scroll progress animations
- [ ] Add animations to footer

### NICE TO HAVE (Future)
- [ ] Add 3D card flip animations
- [ ] Implement gesture-based animations
- [ ] Add sound effects (optional)
- [ ] Create animation showcase page

---

## 📊 Animation Performance Tips

1. **Use `will-change` CSS sparingly**
   ```css
   .animated-element {
     will-change: transform, opacity;
   }
   ```

2. **Prefer GPU-accelerated properties**
   - ✅ `transform`, `opacity`
   - ❌ `width`, `height`, `left`, `top`

3. **Monitor FPS**
   - Target: 60 FPS
   - Use Chrome DevTools → Performance tab

4. **Reduce complexity on mobile**
   ```tsx
   const isMobile = useMediaQuery('(max-width: 640px)');
   
   <motion.div animate={isMobile ? {} : { ... }}>
   ```

---

## 🎬 Example: Complete Card Animation

```tsx
// src/components/ProductCard.tsx
import { motion } from "framer-motion";
import { AnimatedCard } from "./AnimatedCard";
import { AnimatedButton } from "./AnimatedButton";
import { hoverGlow } from "@/lib/animations";

export const ProductCard = ({ product, index }) => (
  <AnimatedCard variant="glow" delay={index * 0.1}>
    <motion.div whileHover={hoverGlow}>
      <div className="w-14 h-14 rounded-xl bg-accent-gradient mb-4">
        <product.icon className="w-7 h-7" />
      </div>
    </motion.div>
    
    <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
    <p className="text-muted-foreground mb-4">{product.description}</p>
    
    <div className="flex flex-wrap gap-2 mb-6">
      {product.features.map((feature, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
          className="px-3 py-1 rounded-full bg-secondary border border-border text-sm"
        >
          {feature}
        </motion.span>
      ))}
    </div>
    
    <AnimatedButton 
      variant="lift" 
      ripple={true}
      className="w-full bg-accent-gradient"
    >
      Learn More
    </AnimatedButton>
  </AnimatedCard>
);
```

---

## 🔧 Customizing Animations

### Modify Animation Speed
```tsx
// In animations.ts
export const fastFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } } // Reduced from 0.4
};

export const slowFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } } // Increased from 0.4
};
```

### Modify Color Accents
Update in `src/index.css`:
```css
--forge-orange: 24 100% 50%;  /* Change to your color */
--accent: 199 90% 48%;
```

### Add Custom Easing
```tsx
export const customEase: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96] // Custom cubic-bezier
    }
  }
};
```

---

## 🐛 Troubleshooting

### Animations Not Showing?
1. Check `framer-motion` is installed: `npm list framer-motion`
2. Verify component is imported correctly
3. Check `whileInView` has `viewport={{ once: true }}`
4. Inspect with React DevTools

### Animations Stuttering?
1. Reduce animation count on mobile
2. Use `will-change` for key animations
3. Profile with Chrome DevTools
4. Check CPU/GPU usage

### Performance Issues?
1. Reduce particle count
2. Disable parallax on mobile
3. Use static backgrounds instead of animated
4. Profile animations separately

---

## 📚 Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)
- [Animation Performance](https://web.dev/animations-guide/)
- [60 FPS Animation Guidelines](https://www.smashingmagazine.com/2015/12/animating-clipped-elements-in-css/)

---

**Next:** Follow the implementation checklist above to add animations throughout the UI.

**Questions?** Check the component files for inline documentation and examples.
