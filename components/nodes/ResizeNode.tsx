import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const ResizeNode = ({ data }: NodeProps) => {
  return (
    <Card className="min-w-[150px]">
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-primary" />
      <CardHeader className="p-3">
        <CardTitle className="text-sm font-bold">Resize</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="text-xs text-muted-foreground">
            {data.format || 'Select Format'}
        </div>
      </CardContent>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-primary" />
    </Card>
  );
};

export default memo(ResizeNode);
