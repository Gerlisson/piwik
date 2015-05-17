<?php
/**
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */
namespace Piwik\Plugin\Report;
use Piwik\Plugin\Report;
use Piwik\Piwik;
use Piwik\Plugin\ReportViewConfig;

/**
 * Base type for metric metadata classes that describe aggregated metrics. These metrics are
 * computed in the backend data store and are aggregated in PHP when Piwik archives period reports.
 *
 * Note: This class is a placeholder. It will be filled out at a later date. Right now, only
 * processed metrics can be defined this way.
 */
class SubCategory
{
    protected $category = '';
    protected $name = '';

    /**
     * @var \Piwik\Plugin\ReportViewConfig[]
     */
    protected $reportViews = array();

    protected $order = 99;

    public function getCategory()
    {
        return $this->category;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getOrder()
    {
        return $this->order;
    }

    public function getReportViews()
    {
        return $this->reportViews;
    }

    public function addReportView(ReportViewConfig $report)
    {
        $this->reportViews[] = $report;
    }

    public function getName()
    {
        return $this->name;
    }

    /** @return \Piwik\Plugin\Report\SubCategory[] */
    public static function getAllSubCategories()
    {
        $subcategories = \Piwik\Plugin\Manager::getInstance()->findMultipleComponents('Reports/SubCategories', '\\Piwik\\Plugin\\Report\\SubCategory');

        $instances = array();
        foreach ($subcategories as $subcategory) {
            $instances[] = new $subcategory;
        }

        return $instances;
    }
}