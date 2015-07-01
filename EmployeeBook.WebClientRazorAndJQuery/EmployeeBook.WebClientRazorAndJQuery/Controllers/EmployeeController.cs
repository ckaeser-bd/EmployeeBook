using System.Web.Mvc;

namespace EmployeeBook.WebClientRazorAndJQuery.Controllers
{
    public class EmployeeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}