import { Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum DragonType {
    DOMESTIC = 'Domestic',
    WILD = 'Wild',
}
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

    @Prop({ required: true, enum: Object.values(DragonType) })
    type!: DragonType;

    @Prop({ required: true, minlength: 10 })
    description!: string;
}

export const DragonSchema = SchemaFactory.createForClass(Dragon);