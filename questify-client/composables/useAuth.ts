import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { VERIFY_TOKEN } from "@/graphql/mutations";

interface IUser {
  id: string;
  username: string;
}

export default function useAuth() {
  const user = ref<IUser | null>(null);
  const { mutate, ...states } = useMutation(VERIFY_TOKEN);

  onMounted(async () => {
    const result = await mutate({
      input: {
        token: localStorage.getItem('token') || ''
      }
    })

    
  })

  return { user, ...states };
}