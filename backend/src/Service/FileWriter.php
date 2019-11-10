<?php
declare(strict_types=1);

namespace App\Service;

/**
 * Class FileWriter
 * @package Service
 */
class FileWriter
{
    /**
     * @var string
     */
    private $fileName;

    /**
     * @var bool|resource
     */
    private $resource;

    /**
     * FileWriter constructor.
     *
     * @param string $fileName
     */
    public function __construct(string $fileName)
    {
        $this->fileName = $fileName;
        $this->resource = fopen($this->fileName, 'wrb');
    }

    public function write(string $toWrite): void
    {
        flock($this->resource, LOCK_SH);
         // $toWrite
        flock($this->resource, LOCK_UN);
    }

    public function read(): void
    {

    }
}
