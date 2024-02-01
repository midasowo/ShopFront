import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../../../shared/shared.module";
import {Chart, ChartData, registerables} from "chart.js";
import {AdminOrderService} from "../admin-order.service";

@Component({
  selector: 'app-admin-order-stats',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './admin-order-stats.component.html',
  styleUrl: './admin-order-stats.component.scss'
})
export class AdminOrderStatsComponent implements AfterViewInit {

  @ViewChild("stats") private stats!: ElementRef
  chart!: Chart
  orderCount: number = 0
  salesSum: number = 0

  private data = {
    labels: [],
    datasets: [
      {
        label: 'Orders',
        data: [],
        borderColor: '#FF3F7C',
        backgroundColor: '#FF7A9F',
        order: 1,
        yAxisID: 'y'
      },
      {
        label: 'Sales',
        data: [],
        borderColor: '#0088FF',
        backgroundColor: '#00A1FF ',
        type: 'line',
        order: 0,
        yAxisID: 'y1'
      }
    ]
  } as ChartData;

  constructor(private adminOrderService: AdminOrderService) {
    Chart.register(...registerables)
  }

  ngAfterViewInit(): void {
    this.setupChart()
    this.getSalesStatistics()
  }

  private setupChart() {
    this.chart = new Chart(this.stats.nativeElement, {
      type: 'bar',
      data: this.data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Sales chart'
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          }
        }
      }
    })
  }

  private getSalesStatistics() {
    this.adminOrderService.getSalesStatistics()
      .subscribe(stats => {
        this.data.labels = stats.labels
        this.data.datasets[0].data = stats.orders
        this.data.datasets[1].data = stats.sales
        this.chart.update()
        this.orderCount = stats.orders.reduce((acc: number, value: number) => acc + value)
        this.salesSum = stats.sales.reduce((acc: number, value: number) => acc + value)
      })
  }
}
