const validateDrug = (req, res, next) => {
    const { name, dosage, card, pack, perDay } = req.body;
    // a. Name validation - length must be more than 5
    if (!name || name.trim().length <= 5) {
        return res.status(400)
        .send('<script>alert("Name must be more than 5 characters."); window.history.back();</script>');

    }

    // b. Dosage validation - format: XX-morning,XX-afternoon,XX-night (X is digit)
    const dosagePattern = /^\d{2}-morning,\d{2}-afternoon,\d{2}-night$/;
    if (!dosage || !dosagePattern.test(dosage.trim())) {
        return res.status(400)
        .send('<script>alert("Dosage must be in format: XX-morning,XX-afternoon,XX-night."); window.history.back();</script>');
    }

    // c. Card validation - must be more than 1000
    const cardNum = parseInt(card);
    if (!card || isNaN(cardNum) || cardNum <= 1000) {
        return res.status(400)
        .send('<script>alert("Card must be more than 1000."); window.history.back();</script>');
    }

    // d. Pack validation - must be more than 0
    const packNum = parseInt(pack);
    if (!pack || isNaN(packNum) || packNum <= 0) {
       return res.status(400)
       .send('<script>alert("Pack must be more than 0."); window.history.back();</script>');
    }

    // e. PerDay validation - must be more than 0 and less than 90
    const perDayNum = parseInt(perDay);
    if (!perDay || isNaN(perDayNum) || perDayNum <= 0 || perDayNum >= 90) {
        return res.status(400)
        .send('<script>alert("PerDay must be more than 0 and less than 90."); window.history.back();</script>');
    }

    // If validation passes, proceed to the next middleware
    next();
};

module.exports = validateDrug;