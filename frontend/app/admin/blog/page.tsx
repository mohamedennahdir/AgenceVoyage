'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Plus, Pencil, Trash2, Eye, ToggleLeft, ToggleRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ADMIN_BLOG_POSTS, type AdminBlogPost } from '@/lib/data/mock-admin-extra';
import { cn } from '@/lib/utils/classnames';

const CATEGORIES = ['Toutes', 'Destinations', 'Omra & Hajj', 'Guides pratiques', 'Témoignages'];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-DZ', { day: '2-digit', month: 'short', year: 'numeric' });

export default function AdminBlogPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Toutes');
  const [posts, setPosts] = useState(ADMIN_BLOG_POSTS);

  const toggleStatus = (id: string) => {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, status: p.status === 'published' ? 'draft' as const : 'published' as const } : p
    ));
  };

  const filtered = posts.filter(p => {
    const matchCat = category === 'Toutes' || p.category === category;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const publishedCount = posts.filter(p => p.status === 'published').length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-800">Blog</h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            <span className="text-success-600 font-medium">{publishedCount} publiés</span>
            {' · '}
            <span className="text-warning-600 font-medium">{posts.length - publishedCount} brouillons</span>
          </p>
        </div>
        <Link href="/admin/blog/nouveau">
          <Button variant="primary" size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Nouvel article
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <Input placeholder="Titre, auteur..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-white" />
        </div>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={cn('px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap shrink-0 transition-all',
                category === cat ? 'bg-neutral-900 text-white' : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-400'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                {['Article', 'Catégorie', 'Auteur', 'Vues', 'Lecture', 'Statut', 'Date', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-neutral-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(post => (
                <tr key={post.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-9 rounded overflow-hidden shrink-0">
                        <Image src={post.thumbnail} alt={post.title} fill sizes="48px" className="object-cover" />
                      </div>
                      <p className="font-medium text-neutral-900 max-w-[200px] truncate">{post.title}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                  </td>
                  <td className="px-4 py-3 text-neutral-600 whitespace-nowrap">{post.author}</td>
                  <td className="px-4 py-3 text-neutral-600">{post.views.toLocaleString('fr-DZ')}</td>
                  <td className="px-4 py-3 text-neutral-500 whitespace-nowrap">{post.readTime} min</td>
                  <td className="px-4 py-3">
                    <span className={cn('text-xs px-2 py-1 rounded-full font-medium',
                      post.status === 'published' ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700'
                    )}>
                      {post.status === 'published' ? 'Publié' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-400 whitespace-nowrap text-xs">
                    {post.publishedAt ? formatDate(post.publishedAt) : formatDate(post.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <Link href={`/blog/${post.slug}`}>
                        <button className="w-7 h-7 flex items-center justify-center rounded text-neutral-400 hover:text-primary-500 hover:bg-primary-50 transition-colors" title="Voir">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </Link>
                      <Link href={`/admin/blog/${post.id}/edition`}>
                        <button className="w-7 h-7 flex items-center justify-center rounded text-neutral-400 hover:text-warning-500 hover:bg-warning-50 transition-colors" title="Éditer">
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                      </Link>
                      <button onClick={() => toggleStatus(post.id)}
                        className="w-7 h-7 flex items-center justify-center rounded text-neutral-400 hover:text-success-500 hover:bg-success-50 transition-colors"
                        title={post.status === 'published' ? 'Dépublier' : 'Publier'}
                      >
                        {post.status === 'published'
                          ? <ToggleRight className="w-3.5 h-3.5 text-success-500" />
                          : <ToggleLeft className="w-3.5 h-3.5" />
                        }
                      </button>
                      <button className="w-7 h-7 flex items-center justify-center rounded text-neutral-400 hover:text-error-500 hover:bg-error-50 transition-colors" title="Supprimer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
