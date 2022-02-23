import { Context } from "../../interfaces/interfaces"
import  { UserProfile } from "../../interfaces/interfaces"
import { Profile } from "../../mongoose/models"
export const Query ={
  me: async (_:any, __:any,  {userInfo}:Context) => {

    if(!userInfo){
      return null
    }
  
    const profile = await Profile.findOne({memberId: userInfo.userId})
    return profile
  }
}