import { Building2, Database, User2 } from 'lucide-react';
import DotPattern from '../animations/dot-pattern';
import { cn } from '@/lib/utils';

const Loading: React.FC = () => {
  return (
    <div className="flex gap-3 items-center justify-center min-h-screen">
      <div className='-translate-y-8 flex gap-3'>
        <div className='duration-1000 animate-bounce'>
          <Building2 className="animate-pulse h-12 w-12 text-purple-600" />
        </div>
        <div className='duration-1000 delay-100 animate-bounce'>
          <User2 className="animate-pulse delay-100 h-12 w-12 text-purple-600" />
        </div>
        <div className='duration-1000 delay-200 animate-bounce'>
          <Database className="animate-pulse delay-200 h-12 w-12 text-purple-600" />
        </div>
      </div>
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />
    </div>
  );
};

export default Loading;
