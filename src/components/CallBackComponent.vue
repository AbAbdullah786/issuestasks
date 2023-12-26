
<script>
import axios from "axios";

export default {
  mounted() {
    const name = this.$route.params.name;
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    // Do something with the code, like sending it to your backend for further processing
    axios.get(`https://issuestasks.com/api/auth/${name}/callback`,{
      params: {
        code: code
      }
    }).then (response => {
        if(response.status === 200) {
          this.$router.push('/dashboard')
        }
      })
  },
};
</script>