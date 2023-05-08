# test command
## get job id

This action prints job id by input a name to greet to the log.

## Inputs

### `job-name`

**Required** The name of the person to greet. Default `"World"`.

## Outputs

### `job-id`

The is the job id.

## Example usage

```yaml
uses: actions/get-job-id-action@v1.1
with:
  job-name: 'some other input'
```