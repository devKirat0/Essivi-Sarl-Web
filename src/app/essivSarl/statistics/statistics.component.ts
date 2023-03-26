import {Component, NgZone} from '@angular/core';
import {Chart, ChartConfiguration, ChartOptions,registerables} from "chart.js";
import {ChartService} from "../../services/chart.service";
import {NumberOfPersonPerLabelModel} from "../../models/numberOfPersonPerLabel.model";
import {User} from "../../models/user.model";
import formatters from "chart.js/dist/core/core.ticks";
import {CategoryService} from "../../services/category.service";
import {UserService} from "../../services/user.service";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {

  result:any;
  ca:number = 0;
  totalclient:number = 0;
  totalcategories:number = 0;
  utilisateurs:number = 0;
  pieLabelChart:any =[];
  pieLabelChartCat:any =[];
  lineLabelChart:any =[];
  pieDataChart:number[] = [];
  pieDataChartCat:number[] = [];
  lineDataChart:number[] = [];
  chartPie!: Chart<"pie",number[],unknown>;
  chartPieCat!: Chart<"pie",number[],unknown>;
  chartBar!: Chart<"bar",number[],unknown>;
  chartLine!: Chart<"line",number[],unknown>;
  chartLine2!: Chart<"bar",number[],unknown>;
  constructor(private chartService:ChartService,private zone:NgZone,private categoryService:CategoryService,private userService:UserService,private customerService:CustomerService) {
    Chart.register(...registerables);
  }
  ngOnInit(){
    this.chartService.caPerMonth().then(res =>{
        res?.forEach(value => {
          this.ca+=value.chiffre_affaire;
        })
      }
    );
    this.customerService.getAllCustomers().subscribe((value)=>{
      this.totalclient = value.length
    })
    this.categoryService.getAllCategory().then(res =>{
      res?.forEach(value => {
        this.totalcategories += 1;
      })
    });
    this.userService.getAllUsers().subscribe((value) => {
      this.utilisateurs = value.length
    });
    this.chartService.numberOfPersonPerLabel().then(res=>{
      this.result = res;
      res?.forEach((value) => {
        //console.log(value);
        this.pieLabelChart.push(value.label);
        this.pieDataChart.push(value.nombreAgent);
        if(this.chartPie!=null){
          this.chartPie.destroy();
        }
        this.chartPie = new Chart('canvasPie',{
          type:'pie',
          data: {
            labels:this.pieLabelChart,
            datasets:[{
              data:this.pieDataChart
            }]
          }
        });
      })
    })
    this.chartService.quantityPerCategory().then(res=>{
      this.result = res;
      res?.forEach((value) => {
        //console.log(value)
        this.pieLabelChartCat.push(value.catégorie);
        this.pieDataChartCat.push(value.quantité);
        if(this.chartPieCat!=null){
          this.chartPieCat.destroy();
        }
        this.chartPieCat = new Chart('canvasPieCat',{
          type:'pie',
          data:{
            labels: this.pieLabelChartCat,
            datasets:[{
              data:this.pieDataChartCat
            }]
          }
        })
      });
      //console.log(`***********${this.pieLabelChart}`);
    })
    this.chartService.caPerMonth().then((res) =>{
      this.result=res;
      res?.forEach((value) => {
        //console.log(value);
        this.lineLabelChart.push(value.Mois);
        this.lineDataChart.push(value.chiffre_affaire);
        if(this.chartLine!=null){
          this.chartLine.destroy();
        }
        this.chartLine = new Chart('canvasLine',{
          type:'line',
          data:{
            labels:this.lineLabelChart,
            datasets:[{
              label:"Chiffre d'affaire par mois",
              data:this.lineDataChart
            }]
          }
        })
      })
    })
    this.chartService.caOfCategoryPerMonth().then(res =>{
      this.result = res;
      let labels:any = [];
      let months:any = [];
      let datasets: {label: string, data: number[]}[]=[];
      res?.forEach((value) => {
        if(!labels.includes(value.labelOfCat)){
          labels.push(value.labelOfCat);
        }
        if(!months.includes(value.Mois)){
          months.push(value.Mois);
        }
      });
      labels.forEach((label1:any)=>{
        let datas:any = [null,null,null,null,null,null,null,null,null,null,null,null,]
        console.log(label1);
        res?.filter(value => value.labelOfCat==label1).forEach((values2:any)=>{
          //datas.push(null);
          //console.log(values2);
          /*for (let i = 1; i <= 12; i++) {
            if (values2.Mois==i){
              datas.push(values2.chiffre_per_month);
            }else {
              datas.push(null);
            }
          }*/
          datas[values2.Mois-1]=values2.chiffre_per_month;
          //console.log(values2.chiffre_per_month);
        });
        datasets.push({
          label:label1,
          data: datas
        })
        console.log(datas);
      });
      //console.log(datasets);
      this.chartLine2 = new Chart('canvasLine2',{
        type:'bar',
        data:{
          labels:months,
          datasets:datasets
        }
      })
    })
  }
  MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  months(config: any) {
    const cfg = config || {};
    const count = cfg.count || 12;
    const section = cfg.section;
    const values = [];
    let i, value;

    for (i = 0; i < count; ++i) {
      value = this.MONTHS[Math.ceil(i) % 12];
      values.push(value.substring(0, section));
    }

    return values;
  }


}
