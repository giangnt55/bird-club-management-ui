import { Component } from '@angular/core';

interface DataItem {
  Name: string;
  Age: number;
  Office: string;
  Address: string;
  StartDate: string;
  Salary: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor() {}

  data: DataItem[] = [
    {
      Name: 'Gloria F. Mead',
      Age: 25,
      Office: 'Sagittarius',
      Address: '2829 Trainer Avenue Peoria, IL 61602',
      StartDate: '29-03-2018',
      Salary: 16200,
    },
    {
      Name: 'Andrea J. Cagle',
      Age: 30,
      Office: 'Gemini',
      Address: '1280 Prospect Valley Road Long Beach, CA 90802',
      StartDate: '29-03-2018',
      Salary: 160,
    },
    {
      Name: 'Andrea J. Cagle',
      Age: 20,
      Office: 'Gemini',
      Address: '2829 Trainer Avenue Peoria, IL 61602',
      StartDate: '29-03-2018',
      Salary: 162700,
    },
    {
      Name: 'John Doe',
      Age: 35,
      Office: 'Pisces',
      Address: '123 Main Street Anytown, USA',
      StartDate: '01-01-2020',
      Salary: 10000,
    },
    {
      Name: 'Jane Smith',
      Age: 28,
      Office: 'Aquarius',
      Address: '456 Park Avenue Somewhere, USA',
      StartDate: '15-06-2017',
      Salary: 8500,
    },
    {
      Name: 'Daniela Lidgerton',
      Age: 65,
      Office: 'Information Systems Manager',
      Address: '3177 Waubesa Alley',
      StartDate: '12/6/2022',
      Salary: 3374,
    },
    {
      Name: 'Theresa Lewsey',
      Age: 61,
      Office: 'Senior Developer',
      Address: '198 Old Shore Drive',
      StartDate: '1/22/2023',
      Salary: 2805,
    },
    {
      Name: 'Nanny Breach',
      Age: 24,
      Office: 'Data Coordinator',
      Address: '6 Warrior Place',
      StartDate: '10/29/2022',
      Salary: 4433,
    },
    {
      Name: 'Patricio Lukianovich',
      Age: 47,
      Office: 'Civil Engineer',
      Address: '46569 Fisk Street',
      StartDate: '6/16/2023',
      Salary: 4220,
    },
    {
      Name: 'Egor Twamley',
      Age: 20,
      Office: 'Food Chemist',
      Address: '5404 Rusk Parkway',
      StartDate: '1/30/2023',
      Salary: 9491,
    },
    {
      Name: 'Gray Alti',
      Age: 18,
      Office: 'Chemical Engineer',
      Address: '7520 Hauk Center',
      StartDate: '12/22/2022',
      Salary: 8474,
    },
    {
      Name: 'Rayner Barlas',
      Age: 92,
      Office: 'Chief Design Engineer',
      Address: '97650 Kedzie Crossing',
      StartDate: '9/12/2022',
      Salary: 551,
    },
    {
      Name: 'Elie Bullen',
      Age: 57,
      Office: 'Physical Therapy Assistant',
      Address: '6 Crownhardt Parkway',
      StartDate: '8/1/2022',
      Salary: 5451,
    },
    {
      Name: 'Claresta Rielly',
      Age: 73,
      Office: 'Senior Cost Accountant',
      Address: '203 Sunnyside Place',
      StartDate: '6/23/2023',
      Salary: 3903,
    },
    {
      Name: 'Obediah Skevington',
      Age: 49,
      Office: 'Chief Design Engineer',
      Address: '7 Thompson Trail',
      StartDate: '6/27/2023',
      Salary: 3980,
    },
    {
      Name: 'Gideon Simoncini',
      Age: 71,
      Office: 'Staff Accountant II',
      Address: '88 Scofield Circle',
      StartDate: '11/4/2022',
      Salary: 2778,
    },
    {
      Name: 'Andee Boraston',
      Age: 53,
      Office: 'Junior Executive',
      Address: '1285 Harbort Road',
      StartDate: '4/16/2023',
      Salary: 206,
    },
    {
      Name: 'Harrietta Stennett',
      Age: 12,
      Office: 'VP Quality Control',
      Address: '4874 Marcy Road',
      StartDate: '11/27/2022',
      Salary: 4863,
    },
    {
      Name: 'Kary Penman',
      Age: 84,
      Office: 'Payment Adjustment Coordinator',
      Address: '00 Havey Center',
      StartDate: '3/27/2023',
      Salary: 3438,
    },
    {
      Name: 'Faith Berkowitz',
      Age: 100,
      Office: 'Product Engineer',
      Address: '00 Beilfuss Crossing',
      StartDate: '12/23/2022',
      Salary: 2721,
    },
    {
      Name: 'Maggie Beet',
      Age: 80,
      Office: 'Dental Hygienist',
      Address: '70592 Gina Pass',
      StartDate: '12/5/2022',
      Salary: 4800,
    },
    {
      Name: 'Ettore Jaime',
      Age: 26,
      Office: 'Director of Sales',
      Address: '7 Manley Street',
      StartDate: '11/7/2022',
      Salary: 2918,
    },
    {
      Name: 'Wileen Deal',
      Age: 28,
      Office: 'Project Manager',
      Address: '37 Pond Alley',
      StartDate: '4/10/2023',
      Salary: 5763,
    },
    {
      Name: 'Genny Mewis',
      Age: 88,
      Office: 'Senior Quality Engineer',
      Address: '1683 Kensington Drive',
      StartDate: '1/26/2023',
      Salary: 632,
    },
    {
      Name: 'Jon Kauscher',
      Age: 34,
      Office: 'Chief Design Engineer',
      Address: '653 Spaight Avenue',
      StartDate: '12/21/2022',
      Salary: 4463,
    },
    {
      Name: 'Scott Kiffin',
      Age: 5,
      Office: 'Marketing Manager',
      Address: '641 Brown Circle',
      StartDate: '11/13/2022',
      Salary: 706,
    },
    {
      Name: 'Joella Toombs',
      Age: 43,
      Office: 'Civil Engineer',
      Address: '592 Algoma Trail',
      StartDate: '11/13/2022',
      Salary: 2144,
    },
    {
      Name: 'Licha Cutts',
      Age: 48,
      Office: 'Registered Nurse',
      Address: '40385 Ridgeway Terrace',
      StartDate: '3/20/2023',
      Salary: 7558,
    },
    {
      Name: 'Hamlen Kobierzycki',
      Age: 48,
      Office: 'Help Desk Technician',
      Address: '29 Barby Point',
      StartDate: '8/21/2022',
      Salary: 3360,
    },
    {
      Name: 'Giffie Ahrenius',
      Age: 51,
      Office: 'Occupational Therapist',
      Address: '93 Sunfield Way',
      StartDate: '3/1/2023',
      Salary: 4074,
    },
    {
      Name: 'Neville Lent',
      Age: 97,
      Office: 'Administrative Assistant II',
      Address: '700 Alpine Junction',
      StartDate: '1/12/2023',
      Salary: 644,
    },
    {
      Name: 'Brandie Ketch',
      Age: 41,
      Office: 'Quality Control Specialist',
      Address: '6422 Paget Road',
      StartDate: '4/27/2023',
      Salary: 4971,
    },
    {
      Name: 'Valentin Haimes',
      Age: 49,
      Office: 'General Manager',
      Address: '76 Service Street',
      StartDate: '12/17/2022',
      Salary: 5103,
    },
    {
      Name: 'Mathe Caswell',
      Age: 42,
      Office: 'Project Manager',
      Address: '78165 Gale Drive',
      StartDate: '6/6/2023',
      Salary: 9371,
    },
    {
      Name: 'Nicko Caffery',
      Age: 3,
      Office: 'Engineer I',
      Address: '048 Spenser Court',
      StartDate: '11/22/2022',
      Salary: 695,
    },
    {
      Name: 'Jaymie Douce',
      Age: 18,
      Office: 'Mechanical Systems Engineer',
      Address: '3231 Fisk Point',
      StartDate: '1/20/2023',
      Salary: 2021,
    },
    {
      Name: 'Darrick Pickup',
      Age: 24,
      Office: 'Assistant Professor',
      Address: '9522 Forest Terrace',
      StartDate: '5/13/2023',
      Salary: 1837,
    },
    {
      Name: 'Erica Mohan',
      Age: 24,
      Office: 'Clinical Specialist',
      Address: '61 Dovetail Pass',
      StartDate: '4/28/2023',
      Salary: 8209,
    },
    {
      Name: 'Gabe Blethin',
      Age: 69,
      Office: 'Dental Hygienist',
      Address: '07692 Bartillon Road',
      StartDate: '2/20/2023',
      Salary: 4523,
    },
    {
      Name: 'Lin Robottom',
      Age: 41,
      Office: 'Speech Pathologist',
      Address: '03258 Fair Oaks Pass',
      StartDate: '6/3/2023',
      Salary: 7122,
    },
    {
      Name: 'Carmelina Goroni',
      Age: 78,
      Office: 'Business Systems Development Analyst',
      Address: '73 Nancy Parkway',
      StartDate: '8/10/2022',
      Salary: 6676,
    },
    {
      Name: 'Roda Fassum',
      Age: 47,
      Office: 'Sales Associate',
      Address: '609 Mallory Drive',
      StartDate: '1/29/2023',
      Salary: 2893,
    },
    {
      Name: 'Jillana Ladbrook',
      Age: 94,
      Office: 'Media Manager IV',
      Address: '0 Anniversary Point',
      StartDate: '2/16/2023',
      Salary: 1222,
    },
    {
      Name: 'Odelinda Brockelsby',
      Age: 13,
      Office: 'Web Developer III',
      Address: '2380 Erie Alley',
      StartDate: '6/2/2023',
      Salary: 2489,
    },
    {
      Name: 'Oliver Barthelemy',
      Age: 75,
      Office: 'VP Quality Control',
      Address: '7245 5th Pass',
      StartDate: '4/24/2023',
      Salary: 2019,
    },
    {
      Name: 'Elizabet Goldthorpe',
      Age: 21,
      Office: 'Accounting Assistant II',
      Address: '2 Burning Wood Road',
      StartDate: '7/18/2022',
      Salary: 4858,
    },
    {
      Name: 'Celka Baress',
      Age: 46,
      Office: 'VP Quality Control',
      Address: '6 Forster Center',
      StartDate: '4/23/2023',
      Salary: 4826,
    },
    {
      Name: 'Rip Gligoraci',
      Age: 18,
      Office: 'Community Outreach Specialist',
      Address: '504 Dovetail Pass',
      StartDate: '12/16/2022',
      Salary: 2987,
    },
    {
      Name: 'Tandi Nutty',
      Age: 33,
      Office: 'VP Marketing',
      Address: '9 Dwight Center',
      StartDate: '9/25/2022',
      Salary: 5977,
    },
    {
      Name: 'Zacharias Trematick',
      Age: 14,
      Office: 'Account Representative IV',
      Address: '70 Nelson Place',
      StartDate: '3/2/2023',
      Salary: 4877,
    },
    {
      Name: 'Cherey Samper',
      Age: 60,
      Office: 'Accounting Assistant III',
      Address: '3271 Autumn Leaf Hill',
      StartDate: '8/15/2022',
      Salary: 5693,
    },
    {
      Name: 'Petronille Falla',
      Age: 98,
      Office: 'Registered Nurse',
      Address: '988 Browning Avenue',
      StartDate: '6/28/2023',
      Salary: 4108,
    },
    {
      Name: 'Tallia Purver',
      Age: 100,
      Office: 'Structural Engineer',
      Address: '7 Debs Circle',
      StartDate: '1/27/2023',
      Salary: 3806,
    },
    {
      Name: 'Jared Cavy',
      Age: 86,
      Office: 'Assistant Professor',
      Address: '449 Fairfield Trail',
      StartDate: '10/21/2022',
      Salary: 6254,
    },
    {
      Name: 'Cecilius Turbitt',
      Age: 18,
      Office: 'Environmental Tech',
      Address: '66848 Homewood Trail',
      StartDate: '11/20/2022',
      Salary: 6485,
    },
  ];

  sortColumn: keyof DataItem = 'Name';
  sortDirection: string = 'asc';

  currentPage: number = 1;
  pageSize: number = 10;

  sortTable(columnName: keyof DataItem) {
    if (this.sortColumn === columnName) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = columnName;
      this.sortDirection = 'asc';
    }

    this.data.sort((a, b) => {
      const valA = a[columnName];
      const valB = b[columnName];

      let comparison = 0;
      if (valA < valB) {
        comparison = -1;
      } else if (valA > valB) {
        comparison = 1;
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  get paginatedData(): DataItem[] {
    if (this.pageSize === -1) {
      return this.data;
    } else {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.data.slice(startIndex, endIndex);
    }
  }

  changePageSize(event: any) {
    const size = event.target.value;
    this.pageSize = +size;
    this.currentPage = 1;
  }

  prevPage() {
    this.currentPage--;
  }

  nextPage() {
    this.currentPage++;
  }

  get totalPages(): number {
    return Math.ceil(this.data.length / this.pageSize);
  }
}
