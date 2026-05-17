'use client';

import { useState } from 'react';
import { Pencil, Eye, FileText, CheckCircle, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils/classnames';

const CMS_PAGES = [
  { id: 'about', title: 'À propos', slug: '/a-propos', status: 'published', lastUpdated: '2026-04-01', content: 'Voyages Algérie est une agence de voyages agréée par le Ministère du Tourisme (Catégorie A) et le Ministère des Affaires Religieuses pour les packages Omra et Hajj.\n\nDepuis 2020, nous accompagnons des milliers de familles algériennes dans leurs projets de voyage : packages tout compris, circuits culturels, pèlerinages Omra et Hajj.\n\nNotre engagement : qualité, transparence et service irréprochable.' },
  { id: 'faq', title: 'FAQ', slug: '/faq', status: 'published', lastUpdated: '2026-03-15', content: 'Questions fréquentes sur nos services...' },
  { id: 'contact', title: 'Contact', slug: '/contact', status: 'published', lastUpdated: '2026-02-01', content: 'Coordonnées de l\'agence...' },
  { id: 'cgv', title: 'Conditions Générales de Vente', slug: '/cgv', status: 'published', lastUpdated: '2026-01-01', content: 'Nos conditions générales de vente...' },
  { id: 'privacy', title: 'Confidentialité', slug: '/confidentialite', status: 'published', lastUpdated: '2026-01-01', content: 'Politique de confidentialité...' },
  { id: 'legal', title: 'Mentions légales', slug: '/mentions-legales', status: 'published', lastUpdated: '2026-01-01', content: 'Mentions légales de l\'agence...' },
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-DZ', { day: '2-digit', month: 'long', year: 'numeric' });

export default function AdminPagesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(false);

  const selectedPage = CMS_PAGES.find(p => p.id === selected);

  const handleSelect = (id: string) => {
    const page = CMS_PAGES.find(p => p.id === id);
    setSelected(id);
    setContent(page?.content ?? '');
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-neutral-800">Pages CMS</h1>
        <p className="text-sm text-neutral-500 mt-0.5">Éditez le contenu des pages statiques du site.</p>
      </div>

      <div className="flex gap-5">
        {/* Page list */}
        <div className="w-64 shrink-0 space-y-2">
          {CMS_PAGES.map(page => (
            <button
              key={page.id}
              onClick={() => handleSelect(page.id)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all',
                selected === page.id
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300',
              )}
            >
              <FileText className="w-4 h-4 shrink-0" />
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{page.title}</p>
                <p className="text-xs text-neutral-400 truncate">{page.slug}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Editor */}
        {selectedPage ? (
          <div className="flex-1 bg-white rounded-xl border border-neutral-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-neutral-900">{selectedPage.title}</h2>
                <p className="text-xs text-neutral-400">Dernière mise à jour : {formatDate(selectedPage.lastUpdated)}</p>
              </div>
              <div className="flex gap-2">
                <a href={selectedPage.slug} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="w-4 h-4" />
                    Voir
                  </Button>
                </a>
                <Button variant="primary" size="sm" className="gap-2" onClick={handleSave} disabled={saved}>
                  {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                  {saved ? 'Enregistré !' : 'Enregistrer'}
                </Button>
              </div>
            </div>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={18}
              className="font-mono text-sm resize-none"
              placeholder="Contenu de la page..."
            />
            <p className="text-xs text-neutral-400 mt-2">Markdown supporté. {content.length} caractères.</p>
          </div>
        ) : (
          <div className="flex-1 bg-white rounded-xl border border-neutral-200 flex flex-col items-center justify-center text-neutral-400 p-12">
            <Pencil className="w-12 h-12 mb-3" />
            <p className="text-sm">Sélectionnez une page pour l&apos;éditer</p>
          </div>
        )}
      </div>
    </div>
  );
}
