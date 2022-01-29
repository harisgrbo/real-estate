<template>
  <div class="w-full">
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
          <action-button placeholder="Dodaj novog agenta" @action="$modal.show('agent')"></action-button>
        </div>

        <client-only>
          <modal @before-open="beforeOpen" @before-close="beforeClose" name="agent" :adaptive="true" height="100%">
            <div class="modal-inner">
              <div class="modal-header">
                <h2>Dodavanje novog agenta</h2>
                <i class="material-icons" @click="$modal.hide('agent')">close</i>
              </div>
              <div class="modal-content">
                <TextField type="text" label="Ime i prezime" placeholder="John Doe" v-model="payload.name" class="mb-4 mt-1"></TextField>
                <TextField type="text" label="Email" placeholder="johndoe@mail.com" v-model="payload.email" class="mb-4 mt-1"></TextField>
                <ActionButton placeholder="Dodaj agenta" @action="addNewAgent(); $modal.hide('agent')"></ActionButton>
              </div>
            </div>

          </modal>
        </client-only>
        <!-- BEGIN: Users Layout -->
        <div class="col-span-12 md:col-span-6 lg:col-span-4" v-for="agent in agents" :key="agent.id">
          <div class="box">
            <div class="flex items-start px-5 pt-5">
              <div class="w-full flex flex-col lg:flex-row items-center">
                <img alt="Icewall Tailwind HTML Admin Template" class="rounded-full agent-image" :src="[ agent.avatar_url !== null ? agent.avatar_url  : '/noimage.jpeg']">
                <div class="lg:ml-4 text-center lg:text-left mt-3 lg:mt-0">
                  <a href="" class="font-medium">{{ agent.name }}</a>
                  <dd class="mt-3">
                    <span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">Agent</span>
                  </dd>
                  <div class="bg-red-600 text-white rounded-sm font-semibold px-2 mt-1" v-if="agent.last_time_active_at === null">NEAKTIVAN</div>
                </div>
              </div>
            </div>
            <div class="text-center lg:text-left p-5">
              <div class="flex items-center justify-center lg:justify-start text-gray-700 mt-2 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p>{{ agent.email }}</p></div>
            </div>
            <div class="flex flex-row items-center justify-between px-4 pb-4">
              <action-button placeholder="Izbriši agenta" :style-options="{ width: '100%', marginRight: '8px'}" @action="removeAgent(agent.id)"></action-button>
              <action-button placeholder="Profil" :style-options="{ width: '100%', marginLeft: '8px'}" @action="$router.push('/users/' + agent.id)"></action-button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { Component, Vue} from "nuxt-property-decorator";
import ActionButton from "../../../components/actionButtons/ActionButton";
import TextField from "../../../components/inputs/TextField";

@Component({
  components: {
    TextField,
    ActionButton,
  },
  layout: (ctx) => ctx.$device.isMobile ? 'mobile' : 'article',
})
export default class mojiOglasi extends Vue {
  payload = {}
  agents = []
  temporary_agent = {}
  password = ''

  beforeOpen() {
    document.body.style.overflow = 'hidden';
  }

  beforeClose() {
    document.body.style.overflow = 'auto';
  }

  async created() {
    await this.getAllAgents();
  }

  async getAllAgents() {
    try {
      let res = await this.$axios.get('/agents');

      this.agents = res.data.data;

    } catch (e) {
      console.log(e)
    }
  }

  async removeAgent(id) {
    try {
      let index = this.agents.findIndex(item => item.id === id);

      await this.$axios.delete('/agents/' + id);

      this.agents.splice(index, 1)

      this.$toast.open({
        message: "Uspješno ste izbrisali agenta",
        type: 'success',
        duration: 5000
      });

    } catch (e) {
      console.log(e)
    }
  }

  async addNewAgent() {
    try {
      let res = await this.$axios.post('/agents', {
        name: this.payload.name,
        email: this.payload.email
      })

      this.agents.push(res.data.data);

      this.$toast.open({
        message: "Uspješno ste dodali novog agenta, koji će dobiti pristupne podatke na email",
        type: 'success',
        duration: 5000
      });

      this.payload.name = '';
      this.payload.email = '';
    } catch(e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.account-wrapper {
}
.content {
  display: flex;
  flex-direction: column;

  @include for-phone-only {
    padding: 0;
  }
  .grid-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 24px;
    grid-row-gap: 24px;
    padding: 0;

    @include for-phone-only {
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      grid-column-gap: 24px;
      grid-row-gap: 24px;
    }
    ::v-deep a {
      width: 100%;
    }


    ::v-deep img {
      width: 100%;
    }
  }
}

h1 {
  color: rgb(72, 72, 72) !important;
}

.no-image {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    height: 400px;

    @include for-phone-only {
      height: 250px;
    }
  }

  p {
    font-size: 20px;
    font-weight: 500;
    margin-top: 24px;
  }
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #f1f1f1;
  box-shadow: none;
}

.agent-image {
  height: 80px;
  width: 80px;
}

</style>
