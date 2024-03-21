import { revalidatePath } from "next/cache";
import { redirect } from 'next/navigation';

export  const uploadf = async (e: React.FormEvent<HTMLFormElement>,userid:string,uservalue:boolean) => {
    e.preventDefault(); // Prevent the default form submission
    const formdata = new FormData(e.currentTarget);
    const visibility = formdata.get('visuals');

    try {
      // Assume 'prisma' and 'user.update' are correctly defined elsewhere
      await prisma?.user.update({
        where: {
          id: userid,
        },
        data: {
          visibility: visibility ? visibility === 'true' : uservalue,
        },
      });
      // Trigger revalidation of data for the current page
    } catch (error) {
      console.error(`Database Error: ${error}`);
    }
    revalidatePath(`/profile/${userid}`)
    redirect(`/profile/${userid}`);

  };