import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Upload } from 'lucide-react';

const ProductFusionNode = ({ data }: NodeProps) => {
  return (
    <Card className="min-w-[200px] border-2 border-primary">
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-primary" />
      <CardHeader className="p-3">
        <CardTitle className="text-sm font-bold flex items-center gap-2">
          Product Fusion
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className="flex flex-col gap-2">
          <div className="border border-dashed rounded-md p-4 flex items-center justify-center bg-muted/50 cursor-pointer hover:bg-muted">
             {data.image ? (
               <img src={data.image} alt="Product" className="w-full h-auto object-contain max-h-[100px]" />
             ) : (
               <div className="text-xs text-muted-foreground flex flex-col items-center">
                 <Upload className="w-4 h-4 mb-1" />
                 <span>Upload Product</span>
               </div>
             )}
          </div>
          <p className="text-xs text-muted-foreground">Hallucination-free blending</p>
        </div>
      </CardContent>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-primary" />
    </Card>
  );
};

export default memo(ProductFusionNode);
