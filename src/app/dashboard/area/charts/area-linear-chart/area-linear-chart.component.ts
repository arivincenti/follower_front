import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { AreaModel } from "src/app/models/area.model";
import { SubSink } from "subsink";
import { Observable } from "rxjs";
import { TicketModel } from "src/app/models/ticketModel";
import { Label, Color } from "ng2-charts";
import { ChartType, ChartDataSets, ChartOptions } from "chart.js";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducer";
import { areaTicketsChart } from "src/app/store/selectors/userOrganizations/tickets/tickets/tickets.selector";

@Component({
  selector: "app-area-linear-chart",
  templateUrl: "./area-linear-chart.component.html",
  styleUrls: ["./area-linear-chart.component.css"],
})
export class AreaLinearChartComponent implements OnInit {
  @Input() area: AreaModel;
  subs = new SubSink();
  tickets$: Observable<TicketModel[]>;
  public barChartLabels: Label[] = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];
  public barChartType: ChartType = "bar";
  public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: "Pendientes" },
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: "Abiertos" },
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: "Cerrados" },
  ];
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          gridLines: {
            color: "rgba(100, 100, 100, .1)", // grid line color (can be removed or changed)
          },
        },
      ],
    },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
      },
    },
  };

  public lineChartColors: Color[] = [
    {
      // Pendientes
      backgroundColor: "#CFD8DC",
      borderColor: "#CFD8DC",
      pointBackgroundColor: "rgba(148,159,177,.5)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.5)",
    },
    {
      // Abiertos
      backgroundColor: "#FF8A80",
      borderColor: "#FF8A80",
      pointBackgroundColor: "rgba(77,83,96,.5)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(77,83,96,.5)",
    },
    {
      // Cerrados
      backgroundColor: "#AED581",
      borderColor: "#AED581",
      pointBackgroundColor: "rgba(148,159,177,.5)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(148,159,177,0.5)",
    },
  ];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}

  ngOnChanges(change: SimpleChanges) {
    this.tickets$ = this.store.select(areaTicketsChart, this.area);
    this.subs.add(
      this.tickets$.subscribe((data) => {
        console.log(data);
        let pendientes = [];
        let abiertos = [];
        let cerrados = [];

        data.forEach((data) => {
          switch (data.status) {
            case "PENDIENTE":
              pendientes.push(data);
              break;
            case "ABIERTO":
              abiertos.push(data);
              break;
            case "CERRADO":
              cerrados.push(data);
              break;
          }
        });

        this.barChartData = [
          { data: this.getCount(pendientes), label: "Pendientes" },
          { data: this.getCount(abiertos), label: "Abiertos" },
          { data: this.getCount(cerrados), label: "Cerrados" },
        ];
      })
    );
  }

  getCount(tickets: any) {
    let mesesHastaHoy = new Date().getMonth() + 1;
    let count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (let i = 0; i < mesesHastaHoy; i++) {
      let mes = i;
      tickets.forEach((ticket) => {
        switch (ticket.month) {
          case mes:
            count[i] += 1;
            break;
          default:
            count[i] = 0;
            break;
        }
      });
    }
    return count;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
