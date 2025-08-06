import mongoose,{Schema ,Types,model, type AnyArray } from 'mongoose';

const mongoUrl: string = 'mongodb://localhost:27017/myDatabase';

mongoose.connect(mongoUrl)
    .then(()=> console.log('MongoDB connected'))
    .catch(err => console.error ('MongoDB Connection error:',err));

interface Iuser{
    name: string;
    age: number;
    email: string;
    todos: Types.ObjectId[];
}

interface Todo{
    task: string;
    done: boolean;
    user:Types.ObjectId;
    createdAt?:Date;
}

const TodoSchema: Schema = new Schema<Todo>({
    task: { type: String, required: true },
    done: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, required: true, default: Date.now }, // Added default
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

const UserSchema: Schema = new Schema<Iuser>({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    todos: [{ // Changed to array
        type: Schema.Types.ObjectId,
        ref: 'Todo',
    }] 
});





export const User =model<Iuser>('User',UserSchema);
export const Todo =model<Todo>('Todo',TodoSchema);





