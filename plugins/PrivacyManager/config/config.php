<?php

return array(
    'Piwik\Plugins\PrivacyManager\LogDataPurger' => DI\object()
        ->constructorParameter('deleteLogsOlderThan', DI\get('ini.Deletelogs.delete_logs_older_than'))
        ->constructorParameter('maxRowsToDeletePerQuery', DI\get('ini.Deletelogs.delete_logs_max_rows_per_query'))
);
