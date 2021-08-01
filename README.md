# SOLUTIONS

### 1. List all the customers who live in any part of CAULFIELD. List only the Customer ID, full name, date of birth and suburb

```sql
SELECT
    CustomerID,
    CONCAT(Surname, ' ', Given) AS `full_name`,
    DOB,
    Suburb
FROM
    `customer`
WHERE
    Suburb LIKE '%CAULFIELD%'
```

### 2. List all of the active staff. Show their Staff ID, full name and weekly salary assuming that they work a 38 hour week

```sql
SELECT
    StaffID,
    CONCAT(Surname, ' ', Given) AS `full_name`,
    RatePerHour * 38 AS `weekly_salary`
FROM
    `staff`
WHERE
    Resigned IS NULL
```

### 3. Which plan has the most expensive contract to break?
```sql
SELECT
    `plan`.*
FROM
    `plan`
ORDER BY
    BreakFee
DESC
LIMIT 1 OFFSET 0
```
### 4. Which brands of mobile phone does this company sell? List only the unique brand names (3marks)

```sql
SELECT
    BrandName
FROM
    `mobile`
GROUP BY
    BrandName
```
OR

```sql
SELECT
    DISTINCT BrandName
FROM
    `mobile`
```
### 5. Which customer is not able to purchase a phone? Use a query to explain why. Hint: Review the customer data
```sql
SELECT
    *
FROM
    customer
LEFT JOIN mobile ON mobile.CustomerID = customer.CustomerID
WHERE
    mobile.CustomerID IS NULL
```

```
These customers never purchased for mobile as their data doesn't exist in the mobile table
```
### 6. How many of each phone plan have been sold?

```sql
SELECT
    mobile.PlanName,
    COUNT(*) AS cnt
FROM
    mobile
GROUP BY
    mobile.PlanName
ORDER BY
    cnt DESC
```
### 7. What is the average age of an Apple phone user?

```sql
SELECT
    ROUND(
        AVG(
            YEAR(NOW()) - YEAR(customer.DOB))
        )
    FROM
        `mobile`
    INNER JOIN customer ON customer.CustomerID = mobile.CustomerID
    WHERE
        BrandName = 'Apple'
```
### 8. What are the first and most recent mobile phone purchases?

```sql
SELECT
    mobile.BrandName,
    COUNT(*) AS cnt
FROM
    `mobile`
GROUP BY
    BrandName
ORDER BY
    joined ASC,
    cnt
DESC
LIMIT 1 OFFSET 0
```

### 9. i. For calls made in 2018 how many calls were made on the weekend?

```sql
SELECT
    COUNT(*) AS weekend_calls_count
FROM
    `calls`
WHERE
    YEAR(CallDate) = 2018 AND WEEKDAY(CallDate) IN(5, 6)
```

###    ii. For calls made in 2018 how many calls were made on each day of the weekend?

```sql
SELECT
    WEEKDAY(CallDate) AS week_day,
    COUNT(*) AS total_calls
FROM
    `calls`
WHERE
    YEAR(CallDate) = 2018
GROUP BY
    WEEKDAY(CallDate)
```

### 10. Provide a listing of the utilization of each tower and its location i.e. how busy each tower is based on the number of connections. Put the busiest tower at the top of the list

```sql
SELECT
    tower.*,
    COUNT(*) AS tower_connects
FROM
    `connect`
INNER JOIN tower ON tower.TowerID = connect.TowerID
GROUP BY
    connect.TowerID
ORDER BY
    tower_connects
DESC
```

### 11. Did any users on the ‘Large’ plan exceed their monthly allowance during August 2018?

```sql
SELECT
    mobile.CustomerID,
    SUM(calls.CallDuration) AS total_calls_duration,
    plan.PlanDuration
FROM
    plan
INNER JOIN mobile ON mobile.PlanName = plan.PlanName
INNER JOIN calls ON calls.MobileID = mobile.MobileID
WHERE
    plan.PlanName = 'Large' AND YEAR(calls.CallDate) = 2018 AND MONTH(calls.CallDate) = 8
GROUP BY
    mobile.CustomerID
HAVING
    total_calls_duration > PlanDuration
ORDER BY
    mobile.CustomerID
```

### 12. The company is upgrading all their 3G towers from to 5G. 
### i. How many towers will be upgraded? (1 mark)
```sql
SELECT
    COUNT(*) AS tower_count
FROM
    `tower`
WHERE
    SignalType = '3G'
```
### ii. what SQL will be needed to update the database to reflect the upgrades?

```sql
UPDATE
    `tower`
SET
    SignalType = '5G'
WHERE
    SignalType = '3G'
```

# using_sequelize
