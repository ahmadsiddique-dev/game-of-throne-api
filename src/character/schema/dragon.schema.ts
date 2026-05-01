import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DragonDocument = HydratedDocument<Dragon>;

@Schema()
export class Dragon {
    @Prop({ required: true, unique: true })
    name!: string; 

    @Prop({ required: true })
    age!: number;

    @Prop({ required: true })
    color!: string;

    @Prop({ required: true })
    isFireBreathing!: boolean;

    @Prop({ required: true })
    rider!: string[];

    @Prop({ required: true, enum: ["Domestic", "Wild"] })
    type!: string;

    @Prop({ required: true, minlength: 10 })
    description!: string;
}