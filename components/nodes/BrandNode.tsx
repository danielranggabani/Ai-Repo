import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const BrandNode = ({ data }: NodeProps) => {
  return (
    <Card className="min-w-[180px] border-l-4 border-l-black">
      <CardHeader className="p-3">
        <CardTitle className="text-sm font-bold">Brand Guardrails</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="flex gap-2 mb-2">
           {data.colors?.map((c: string, i: number) => (
             <div key={i} className="w-4 h-4 rounded-full" style={{ backgroundColor: c }} />
           ))}
        </div>
        <div className="text-xs text-muted-foreground">
          {data.font || 'Default Font'}
        </div>
      </CardContent>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-primary" />
    </Card>
  );
};

export default memo(BrandNode);
