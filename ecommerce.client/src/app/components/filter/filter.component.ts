import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { CategoriesStore } from '../../stores/categories.store';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSearch,
  faArrowLeft,
  faArrowRight,
  faDisplay,
  faChampagneGlasses,
  faGear,
  faSearchPlus,
  faBrain,
  faCogs,
  faRobot,
} from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from '../../services/products.service';
import { ProductsStore } from '../../stores/products.store';
import { HttpErrorResponse } from '@angular/common/http';
import { Settings } from '../../models/settings';
import { ProductsFilter } from '../../models/productsFilter.interface';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { UtilsService } from '../../services/utils.service';
import { Product } from '../../models/product.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  animations: [
    trigger('filterToggle', [
      transition(':enter', [
        style({ height: '0', opacity: 0, overflow: 'hidden' }),
        animate('300ms ease-in-out', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in-out',
          style({ height: '0', opacity: 0, overflow: 'hidden' })
        ),
      ]),
    ]),
  ],
})
export class FilterComponent implements OnInit, OnDestroy {
  @ViewChild('SearchButton') SearchButton!: ElementRef<HTMLButtonElement>;

  EnterClick = () => {};

  settings = new Settings();

  productsService = inject(ProductsService);
  productsStore = inject(ProductsStore);
  utilsService = inject(UtilsService);

  PageNumber = signal(this.settings.GetDefaultPageNumber());
  PageSize = signal(this.settings.GetDefaultPageSize());
  MaxProductsCount = signal(0);

  faSearch = faSearch;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faGear = faGear;
  faRobot = faRobot

  categoriesStore = inject(CategoriesStore);

  ShowFilters = signal(false);

  ShowCategory = signal(false);
  ShowPrice = signal(false);
  ShowRating = signal(false);

  subscription = new Subscription();

  ChangeFiltersVisibility() {
    this.ShowFilters.set(!this.ShowFilters());
  }

  ChangeCategoryVisibility() {
    this.ShowCategory.set(!this.ShowCategory());
  }

  ChangePriceVisibility() {
    this.ShowPrice.set(!this.ShowPrice());
  }

  ChangeRatingVisibility() {
    this.ShowRating.set(!this.ShowRating());
  }

  FilterForm!: FormGroup;

  formBuilder = inject(FormBuilder);
  renderer = inject(Renderer2);

  ShowSearchOptions = signal<boolean>(false);
  AdvancedSearching = signal<boolean>(false);

  AllProducts = signal<Product[]>([])

  ngOnInit(): void {
    this.productsService.GetAllProducts().subscribe({
      next: (products: Product[]) => {
        this.AllProducts.set(products);
      },
      error: (err: HttpErrorResponse) => {
        this.productsStore.SetErrorTrue(err.message);
      },
    });
    
    this.productsService.GetMaxProductsCount().subscribe({
      next: (count: number) => {
        this.MaxProductsCount.set(count);
      },
      error: (err: HttpErrorResponse) => {
        this.productsStore.SetErrorTrue(err.message);
      },
    });

    this.FilterForm = this.formBuilder.group({
      CategoryId: new FormControl<number | null>(null, [Validators.min(0)]),
      Search: new FormControl<string | null>(null, [Validators.maxLength(200)]),
      MinPrice: new FormControl<number | null>(null, [Validators.min(0)]),
      MaxPrice: new FormControl<number | null>(null, [Validators.min(0)]),
      MinRating: new FormControl<number | null>(null, [
        Validators.min(0),
        Validators.max(5),
      ]),
      MaxRating: new FormControl<number | null>(null, [
        Validators.min(0),
        Validators.max(5),
      ]),
      PageNumber: new FormControl<number | null>(null, [Validators.min(1)]),
      PageSize: new FormControl<number | null>(null, [Validators.min(1)]),
    });

    this.StartSearching(true);

    this.EnterClick = this.renderer.listen(
      'document',
      'keydown',
      (event: any) => {
        if (event.key === 'Enter') {
          if (this.SearchButton.nativeElement) {
            this.SearchButton.nativeElement.click();
          }
        }
      }
    );
  }

  StartSearching(Search: boolean) {
    // Init values
    let InitSearch = null;
    let InitCategoryId = null;
    let InitMinPrice = null;
    let InitMaxPrice = null;
    let InitMinRating = null;
    let InitMaxRating = null;
    let InitPageNumber = this.settings.GetDefaultPageNumber();
    let InitPageSize = this.settings.GetDefaultPageSize();

    // Validation

    //search
    
    InitSearch = this.FilterForm.controls['Search'].value;

    //categoryid
    if (!(Number(this.FilterForm.controls['CategoryId'].value) === 0)) {
      InitCategoryId = Number(this.FilterForm.controls['CategoryId'].value);
    }

    //minprice
    if (
      !(this.FilterForm.controls['MinPrice'].value === '') &&
      !(this.FilterForm.controls['MinPrice'].value === null)
    ) {
      InitMinPrice = Number(this.FilterForm.controls['MinPrice'].value);
    } else {
      InitMinPrice = 0;
    }

    //maxprice
    if (
      !(this.FilterForm.controls['MaxPrice'].value === '') &&
      !(this.FilterForm.controls['MaxPrice'].value === null)
    ) {
      InitMaxPrice = Number(this.FilterForm.controls['MaxPrice'].value);
    } else {
      InitMaxPrice = 999999999;
    }

    //minrating - maxrating
    if (
      !(this.FilterForm.controls['MinRating'].value === '') &&
      !(this.FilterForm.controls['MinRating'].value === null)
    ) {
      InitMinRating = Number(this.FilterForm.controls['MinRating'].value);
    }
    if (
      !(this.FilterForm.controls['MaxRating'].value === '') &&
      !(this.FilterForm.controls['MaxRating'].value === null)
    ) {
      InitMaxRating = Number(this.FilterForm.controls['MaxRating'].value);
    }

    if (InitMinRating === null && !(InitMaxRating === null)) {
      InitMinRating = 0;
    }
    if (!(InitMinRating === null) && InitMaxRating === null) {
      InitMaxRating = 5;
    }

    if (Search) {
      this.PageNumber.set(1);
      InitPageNumber = 1;
    } else {
      InitPageNumber = this.PageNumber();
    }
    InitPageSize = this.PageSize();

    let filter: ProductsFilter = {
      CategoryId: InitCategoryId,
      MinPrice: InitMinPrice,
      MaxPrice: InitMaxPrice,
      MinRating: InitMinRating,
      MaxRating: InitMaxRating,
      Search: InitSearch,
      PageNumber: InitPageNumber,
      PageSize: InitPageSize,
    };

    if(this.AdvancedSearching()){
      this.productsStore.SetLoadingTrue();

      this.subscription = this.utilsService.SendMessageToBot(this.utilsService.CreateFinalAIMessageForSearch(filter,JSON.stringify(this.AllProducts()))).subscribe({
        next:(res : any)=>{
          console.log(res?.choices?.[0]?.message?.content)
          try{
            console.log(JSON.parse(res?.choices?.[0]?.message?.content))
            this.productsStore.SetLoadingFalse();
            this.productsStore.SetProducts(JSON.parse(res?.choices?.[0]?.message?.content));
          }catch(ex){
            console.log(ex)
            this.productsStore.SetLoadingFalse();
            this.productsStore.SetErrorTrue("advancedSearchingError");
          }
        },
        error:(err)=>{
          console.log(err);
          this.productsStore.SetLoadingFalse();
          this.productsStore.SetErrorTrue("advancedSearchingError");
        }
      })
    }
    else{
      this.productsStore.loadProductsByPage(filter);
    }
  }
  
  ResetFilters() {
    this.FilterForm.reset();
  }

  PreventChars(event: any, range: boolean, min: number, max: number) {
    if (
      (event.keyCode >= 0 && event.keyCode <= 30) ||
      (event.keyCode >= 48 && event.keyCode <= 57)
    ) {
      if (range) {
        let numberToValidate = Number(event.key);

        if (
          (numberToValidate >= min && numberToValidate <= max) ||
          isNaN(numberToValidate)
        ) {
        } else {
          event.preventDefault();
        }
      }
    } else {
      event.preventDefault();
    }
  }

  NextPage() {
    if ((this.productsStore.productsCount() !== 0) && !this.IsLastPage()) {
      this.PageNumber.set(this.PageNumber() + 1);
      this.productsStore.SetLoadingTrue();
      this.StartSearching(false);
    }
  }
  
  PreviousPage() {
    if (this.PageNumber() !== 1) {
      this.PageNumber.set(this.PageNumber() - 1);
      this.productsStore.SetLoadingTrue();
      this.StartSearching(false);
    }
  }

  IsLastPage(){
    return (this.PageNumber() >= Math.floor(this.MaxProductsCount() / this.productsService.GetDefaultPageSize()));
  }

  ngOnDestroy(): void {
    this.EnterClick = () => {};
    this.subscription.unsubscribe();
  }

  ToggleOptions(){
    this.ShowSearchOptions.set(!this.ShowSearchOptions());
  }

  EnableAdvancedSearching(){
    this.productsStore.SetErrorFalse();
    this.AdvancedSearching.set(true);
  }
  
  DisableAdvancedSearching(){
    this.productsStore.SetErrorFalse();
    this.AdvancedSearching.set(false);
  }

}
