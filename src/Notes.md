# Design Constraints
- Using the version control pattern requires `@connection(fields:)` which appears seems to break the 1 to 1 query hydration in datastore()

# Red Flags
- deletion policy is delete and no way to update?!?! https://github.com/aws-amplify/amplify-cli/issues/4793