<template>
  <div>
    <h1>Lista de Usuarios</h1>
    <div class="mb-3 text-left">
      <b-button v-b-modal.modal-1 variant="outline-primary">Crear nuevo usuario</b-button>
      <b-modal id="modal-1" title="Creando nuevo usuario" hide-footer>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          <b-form-group
            id="input-group-1"
            label="Nombre:"
            label-for="input-name"
          >
            <b-form-input
              id="input-name"
              v-model="form.name"
              placeholder="Ingrese nombre"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Correo electrónico:"
            label-for="input-mail"
          >
            <b-form-input
              id="input-mail"
              v-model="form.email"
              type="email"
              placeholder="Ingrese correo electrónico"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Edad:" label-for="input-age">
            <b-form-input
              id="input-age"
              v-model="form.age"
              type="number"
              placeholder="Ingrese edad"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-4" label="Password:" label-for="input-password">
            <b-form-input
              id="input-password"
              v-model="form.password"
              type="password"
              required
            ></b-form-input>
          </b-form-group>  

          <b-form-group id="input-group-5" label="Username:" label-for="input-username">
            <b-form-input
              id="input-username"
              v-model="form.username"
              required
            ></b-form-input>
          </b-form-group>                 

          <div class="text-center">
            <b-button type="submit" variant="primary" class="mr-2">Aceptar</b-button>
            <b-button  @click="$bvModal.hide('modal-1')">Cancelar</b-button>
          </div>
        </b-form>
      </b-modal>
    </div>
    <div>
      <b-table striped hover :fields="fields" :items="items">
        <template #cell(actions)>
          <b-button size="sm" variant="warning" class="mr-1">
            Editar
          </b-button>
          <b-button size="sm" variant="danger">
            Eliminar
          </b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
  export default {
    data() {
      return {
        items: [],
        fields: [
          {
            key: 'name',
            label: 'Nombre'
          },
          {
            key: 'mail',
            label: 'E-mail',
          },
          {
            key: 'age',
            label: 'Edad',
          },
          {
            key: 'username',
            label: 'Nombre de usuario',
          },
          {
            key: 'actions',
            label: 'Acciones',
          }
        ],
        form: {
          email: '',
          name: '',
          age: null,
          password: '',
          username: '',
        },
        show: true
      }
    },
    created() {
      axios.get('https://fast-dusk-52904.herokuapp.com/api/user')
      .then(res => {
        this.items = res.data.users
      })
      .catch(err => {
        console.error(err);
      })
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        /* axios.post('https://fast-dusk-52904.herokuapp.com/user', this.form) */
        axios.post('https://fast-dusk-52904.herokuapp.com/api/user', this.form)
        .then(res => {
          console.log(res)
          this.$swal({
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 2000
          })
        })
        .catch(err => {
          console.error(err); 
        })        
      },
      onReset(event) {
        event.preventDefault()
        this.$swal({
          title: '¿Esta seguro?',
          text: "No podra deshacer esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, Eliminar!'
        }).then((result) => {
          if (result.isConfirmed) {
            // Reset our form values
            this.form.email = ''
            this.form.name = ''
            this.form.food = null
            this.form.checked = []
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
              this.show = true
            })
            this.$swal(
              'Eliminado!',
              'La info a sido eliminada.',
              'success'
            )
          }
        })
        
      }
    }
  }
</script>