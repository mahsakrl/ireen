<script>
import { Bar } from 'vue-chartjs'
import { mapState } from 'vuex'
import { horizontalLine } from '~/scripts/horizontalLine'
export default {
  extends: Bar,

  computed: {
    ...mapState('profile', ['profile']),
    labels() {
      return this.profile.map((user) =>
        user.name.split('.').length === 1
          ? user.name.split(' ')[0]
          : // has prefix MR, MRS
            user.name.split(' ')[1]
      )
    },
    inComplete() {
      return this.profile.map((user) => {
        return user.todo.filter((el) => !el.completed).length
      })
    },
    complete() {
      return this.profile.map((user) => {
        return user.todo.filter((el) => !!el.completed).length
      })
    },
    datasets() {
      return [
        {
          label: 'not completed',
          backgroundColor: '#ff6962',
          data: this.inComplete
        },
        {
          label: ' completed',
          backgroundColor: '#77dd76',
          data: this.complete
        }
      ]
    }
  },
  beforeMount() {
    this.addPlugin(horizontalLine)
  },
  mounted() {
    this.renderChart(
      {
        labels: this.labels,
        datasets: this.datasets
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              stacked: true,
              categoryPercentage: 0.5,
              barPercentage: 1
            }
          ],
          yAxes: [
            {
              stacked: true
            }
          ]
        }
      }
    )
  }
}
</script>
