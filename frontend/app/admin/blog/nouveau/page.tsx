'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils/classnames';

const CATEGORIES = ['Destinations', 'Omra & Hajj', 'Guides pratiques', 'Témoignages', 'Actualités'];

const articleSchema = z.object({
  title: z.string().min(5, 'Titre trop court'),
  slug: z.string().min(3, 'Slug requis'),
  category: z.string().min(1, 'Catégorie requise'),
  excerpt: z.string().min(20, 'Résumé trop court'),
  content: z.string().min(50, 'Contenu trop court'),
  thumbnail: z.string().optional(),
  readTime: z.number().min(1),
  status: z.enum(['draft', 'published'] as const),
});

type ArticleForm = z.infer<typeof articleSchema>;

function slugify(s: string) {
  return s.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function NewBlogPage() {
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ArticleForm>({
    resolver: zodResolver(articleSchema),
    defaultValues: { status: 'draft', readTime: 5 },
  });

  const title = watch('title');
  const currentStatus = watch('status');
  const currentCategory = watch('category');

  const onSubmit = (data: ArticleForm) => {
    console.log('Article créé (mock):', data);
    setSaved(true);
    setTimeout(() => router.push('/admin/blog'), 1500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-3xl">
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => router.push('/admin/blog')} className="text-neutral-400 hover:text-neutral-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-neutral-800 flex-1">Nouvel article</h1>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="sm" className="gap-2">
            <Eye className="w-4 h-4" />
            Aperçu
          </Button>
          <Button type="submit" variant="primary" size="sm" className="gap-2" disabled={saved}>
            <Save className="w-4 h-4" />
            {saved ? 'Enregistré !' : currentStatus === 'published' ? 'Publier' : 'Brouillon'}
          </Button>
        </div>
      </div>

      {/* Infos */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-4">
        <h2 className="font-semibold text-neutral-800">Informations</h2>

        <div>
          <Label htmlFor="title" className="text-xs font-medium mb-1.5 block">Titre *</Label>
          <Input
            id="title"
            placeholder="ex: Top 10 des destinations depuis l'Algérie"
            {...register('title')}
            onChange={(e) => {
              register('title').onChange(e);
              setValue('slug', slugify(e.target.value));
            }}
            className={cn(errors.title && 'border-error-400')}
          />
          {errors.title && <p className="text-xs text-error-600 mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <Label htmlFor="slug" className="text-xs font-medium mb-1.5 block">Slug URL</Label>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 font-mono">/blog/</span>
            <Input id="slug" {...register('slug')} className="font-mono text-sm flex-1" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-xs font-medium mb-1.5 block">Catégorie *</Label>
            <Select value={currentCategory} onValueChange={(v) => v && setValue('category', v)}>
              <SelectTrigger><SelectValue placeholder="Choisir..." /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="readTime" className="text-xs font-medium mb-1.5 block">Temps de lecture (min)</Label>
            <Input id="readTime" type="number" min={1} {...register('readTime', { valueAsNumber: true })} />
          </div>
        </div>

        <div>
          <Label htmlFor="thumbnail" className="text-xs font-medium mb-1.5 block">Image (URL)</Label>
          <Input id="thumbnail" placeholder="https://images.unsplash.com/..." {...register('thumbnail')} />
        </div>
      </div>

      {/* Contenu */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 space-y-4">
        <h2 className="font-semibold text-neutral-800">Contenu</h2>

        <div>
          <Label htmlFor="excerpt" className="text-xs font-medium mb-1.5 block">Résumé (affiché en carte) *</Label>
          <Textarea id="excerpt" rows={3} placeholder="Courte description de l'article..." {...register('excerpt')} className={cn(errors.excerpt && 'border-error-400')} />
          {errors.excerpt && <p className="text-xs text-error-600 mt-1">{errors.excerpt.message}</p>}
        </div>

        <div>
          <Label htmlFor="content" className="text-xs font-medium mb-1.5 block">Contenu complet * (Markdown)</Label>
          <Textarea id="content" rows={16} placeholder="# Titre&#10;&#10;Votre contenu en Markdown..." {...register('content')} className={cn('font-mono text-sm', errors.content && 'border-error-400')} />
          {errors.content && <p className="text-xs text-error-600 mt-1">{errors.content.message}</p>}
        </div>
      </div>

      {/* Publication */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5">
        <h2 className="font-semibold text-neutral-800 mb-3">Statut</h2>
        <div className="flex gap-3">
          {(['draft', 'published'] as const).map(s => (
            <button key={s} type="button" onClick={() => setValue('status', s)}
              className={cn('px-4 py-2 rounded-lg border text-sm font-medium transition-all',
                currentStatus === s ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
              )}
            >
              {s === 'draft' ? 'Brouillon' : 'Publié'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" variant="primary" size="lg" className="gap-2" disabled={saved}>
          <Save className="w-4 h-4" />
          {saved ? 'Enregistré !' : 'Créer l\'article'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push('/admin/blog')}>Annuler</Button>
      </div>
    </form>
  );
}
