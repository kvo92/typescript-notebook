import { GroupVisit } from "packs/models/GroupVisit";
import { GVList } from "packs/models/GVList";
import { gbi, qsa } from "./domUtils";

let groupVisits: GroupVisit[] = [];
let gvList: GVList;
let filtered: boolean;
let filterResult: GroupVisit[] = [];
let filterBtn = gbi("filter-btn");
const filters = qsa(".filter");
const createObjects = (objects) => {
  objects.forEach((element) => {
    let data = element.dataset;
    groupVisits.push(
      new GroupVisit({
        ref: element,
        group_name: data.group_name,
        office_assigned: data.office_assigned,
        visit_at: data.visit_at,
        cap_tour: data.cap_tour,
        house_chamber: data.house_chamber,
        senate_chamber: data.senate_chamber,
        status: data.status,
      })
    );
  });
  gvList = new GVList(groupVisits);
};

const resetFilter = () => {
  filterResult = [];
  filtered = false;
};

export const handleFilters = (objects, resultContainer?, style?) => {
  createObjects(objects);
  filterBtn.addEventListener("click", () => {
    handleActivateFilters(resultContainer, style);
  });
  filters.forEach((aFilter) => {
    aFilter.addEventListener("change", () => {
      handleActivateFilters(resultContainer, style);
    });
  });
};

const handleActivateFilters = (resultContainer?, style?) => {
  resetFilter();

  filters.forEach((aFilter) => {
    filter(gvList, aFilter.value);
  });
  handleResult(groupVisits, filterResult, resultContainer, style);
};

const filter = (groupVisitList: GVList, datasetValue: string) => {
  if (filterResult.length != 0) {
    groupVisitList = new GVList(filterResult);
  }
  if (filterResult.length == 0 && filtered) {
    filtered = true;
    filterResult = [];
    return;
  }
  filterResult = groupVisitList[`${datasetValue}`]();

  filtered = true;
};

const handleResult = (
  groupVisits: GroupVisit[],
  filterResult: GroupVisit[],
  resultContainer?,
  style?
) => {
  groupVisits?.forEach((gv) => gv.hide());
  filterResult?.forEach((gv) => gv.show());
  if (resultContainer === undefined) return;
  resultContainer.innerHTML = "";
  filterResult?.forEach(
    (gv) => (resultContainer.innerHTML += gv.ref.innerHTML)
  );
  // styling
  qsa("tr", resultContainer).forEach((tr) => {
    style.forEach((aClass) => {
      tr.classList.add(aClass);
    });
  });
};
