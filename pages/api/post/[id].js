import { getDb } from "../../../util/mongodb";
import {ObjectId} from "mongodb";

export default async function handler(req,res){
    const {method, query: {id}} = req;


    const {db} = await getDb();


    if(method === "DELETE"){
        try {
            await db.collection("posts").deleteOne({_id: new ObjectId(id)});
            res.status(200).json({message: "Post deleted"});
            
        } catch (error) {
            res.status(500).json({message: "Error deleting post"});
            
        }
    }
}
